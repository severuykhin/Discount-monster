<?php

namespace common\components\parsers;

use common\components\parsers\Parser;
use common\models\Item;
use common\models\Link;
use common\models\Product;
use yii\helpers\Json;
use yii\helpers\VarDumper;


class Reebok extends Parser {

	public $options = [];

	public function parseLink(Link $link, Store $store)
	{
		echo '=======================' . PHP_EOL;
		echo 'Start parsing link: ' . $link->name . PHP_EOL;
		echo '=======================' . PHP_EOL;

		$start = 0;
		$step  = 1000;
		$cardsAll = [];

		
		do {
			$markup = $this->getHtml($link->href . "?sz=$step&start=$start");
			$document = \phpQuery::newDocumentHTML($markup);
			$cardsOnPage = $document->find(".product-tile");

			foreach($cardsOnPage as $card) {
				$cardsAll[] = $card;
			}

			$start = $start + $step;

		} while ((int)$cardsOnPage->length() > 0);

		$product = [];

		foreach($cardsAll as $key => $card) {

			$cardLink = pq($card);
			$name = $cardLink->find('span.title')->html();
			$url  = $cardLink->find('a.product-link');
			$uniqueId = md5($name . $url);

			if (!self::processFilter($name, $store->tags)) continue;

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

			if ($new) {
				$product->img = $this->getImg($product->url);
			}

			$product->save();
			$config['product_id'] = $product->id;
			$product->updateStoreBinding($config);
			$product->updateCategoryBinding($config);
			$product->updateGenderBinding($config);
			$products[] = $product;

			if ($new) {
				echo 'NEW Model #' . $key . ' with name - ' . $name . ' parsed ' . PHP_EOL;
			} else {
				echo 'Model #' . $key . ' with name - ' . $name . ' updated ' . PHP_EOL;				
			}

		}

		return $products;
	}

	protected function getImg(string $url): string
	{
		$markup = $this->getHtml($url);
		$document = \phpQuery::newDocumentHTML($markup);
		$img = $document->find('[data-auto-id="images_container"] img');
		return $img->attr('src');
	}

}