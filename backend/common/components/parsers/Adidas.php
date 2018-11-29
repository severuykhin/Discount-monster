<?php

namespace common\components\parsers;

use common\components\parsers\Parser;
use common\models\Store;
use common\models\Link;
use common\models\Product;
use yii\helpers\Json;
use yii\helpers\VarDumper;


class Adidas extends Parser {

	public $options = [
		'version' => '1.0',
		'verify'  => false,
		'debug'   => true,
		'headers' => [
			':authority' => 'www.adidas.ru',
			':method'    => 'GET',
			':path'      => '/',
			':scheme'    => 'https',
			'Accept'     => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng',
			'Upgrade-Insecure-Requests' => '1',
			'accept-encoding' => 'gzip, deflate, br',
			'accept-language' => 'en-US,en;q=0.9,ru;q=0.8',
			'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
		]
	];

	public function parseLink(Link $link, Store $store)
	{
		echo '=======================' . PHP_EOL;
		echo 'Start parsing link: ' . $link->name . PHP_EOL;
		echo '=======================' . PHP_EOL;

		$start = 0;
		$step  = 120;
		$cardsAll = [];

		
		do {
			$markup = $this->getHtml($link->href . "?sz=$step&start=$start");
			$document = \phpQuery::newDocumentHTML($markup);
			$cardsOnPage = $document->find(".product-tile");

			foreach($cardsOnPage as $card) {
				$cardsAll[] = $card;
			}

			echo count($cardsAll);

			$start = $start + $step;

		} while ((int)$cardsOnPage->length() > 0);

		$product = [];

		foreach($cardsAll as $key => $card) {

			$cardLink = pq($card);
			$name = $cardLink->find('span.title')->html();
			$url  = $cardLink->find('a.product-link');
			$uniqueId = md5($name . $url);

			// Because in adidas we can groupe products by collections
			// if (!self::processFilter($name, $store->tags)) continue;

			$product = Product::find()->where(['uniqueId' => $uniqueId])->one();
			$new = false;

			if (!$product) {
				$product = new Product();
				$new = true;
				echo PHP_EOL;
				echo 'New item! - ' . $name . ' ' . PHP_EOL;
				echo PHP_EOL;				
			}

			$price      = $cardLink->find('span.baseprice');
			$price_sale = $cardLink->find('span.salesprice');
			$priceNumeric = str_replace( '.' , '' , trim($price->html()));
			$priceSaleNumeric = str_replace( '.' , '' , trim($price_sale->html()));
			
			if (!$priceNumeric || !$priceSaleNumeric) {
				echo 'PRICE NOTICE! Model #' . $key . ' with name - ' . $name . ' has no actual price or sale price' . PHP_EOL;
				echo PHP_EOL;
				continue;
			}

			$discount = (int) round(($priceNumeric - $priceSaleNumeric) / ($priceNumeric / 100), 0, PHP_ROUND_HALF_DOWN);

			$config = [
				'name'       => $name,
				'price'       => $priceNumeric,
				'price_sale'  => $priceSaleNumeric,
				'url'         => 'https://reebok.ru' . $url->attr('href'),
				'discount'    => $discount,
				'store_id'    => $store->id,
				'gender'      => $link->gender,
				'uniqueId' => $uniqueId,
				'category_id' => $link->category_id,
				'source'      => 'parsed'
			];

			
			$product->setValues($config);
			$product->img = $cardLink->find('img.lazyload')->attr('data-original');

			$product->save();
			$config['product_id'] = $product->id;
			$product->updateStoreBinding($config);
			$product->updateCategoryBinding($config);
			$product->updateGenderBinding($config);
			$products[] = $product;

			if ($new) {
				echo 'Model #' . $key . ' with name - ' . $name . ' parsed ' . PHP_EOL;
			} else {
				echo 'Model #' . $key . ' with name - ' . $name . ' updated ' . PHP_EOL;				
			}

		}

		return $products;
	}
}