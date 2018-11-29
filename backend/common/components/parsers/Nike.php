<?php

namespace common\components\parsers;

use common\components\parsers\Parser;
use common\models\Store;
use common\models\Link;
use common\models\Product;
use yii\helpers\Json;
use yii\helpers\VarDumper;

class Nike extends Parser {

	public $options = [];

	public function parseLink(Link $link, Store $store)
	{	

		echo '=======================' . PHP_EOL;
		echo 'Start parsing link: ' . $link->name . PHP_EOL;
		echo '=======================' . PHP_EOL;

		$markup = self::getHtml($link->href);
		$document = \phpQuery::newDocumentHTML($markup);
		$cards = $document->find(".grid-item");
		$products = [];

		foreach($cards as $key => $card) {
			$cardLink = pq($card);
			$name = $cardLink->find('.product-display-name')->html();
			$url  = $cardLink->attr('data-pdpurl');
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

			$price      = $cardLink->find('span.overridden')->html();
			$price_sale = $cardLink->find('span.local')	->html();
			$priceNumeric = str_replace( [' ', 'pyб.'] , '' , $price);
			$priceSaleNumeric = str_replace( [' ', 'pyб.'] , '' , trim($price_sale));
			
			if (!$priceNumeric || !$priceSaleNumeric) {
				echo 'PRICE NOTICE! Model #' . $key . ' with name - ' . $name . ' has no actual price or sale price' . PHP_EOL;
				echo PHP_EOL;
				continue;
			}

			$discount = (int) round(($priceNumeric - $priceSaleNumeric) / ($priceNumeric / 100), 0, PHP_ROUND_HALF_DOWN);

			$config = [
				'name'        => $name,
				'price'       => $priceNumeric,
				'price_sale'  => $priceSaleNumeric,
				'url'         => $url,
				'discount'    => $discount,
				'store_id'    => $store->id,
				'gender'      => $link->gender,
				'uniqueId'    => $uniqueId,
				'category_id' => $link->category_id,
				'source'      => 'parsed'
			];

			$product->setValues($config);

			$product->img = $cardLink->find('img')->attr('src');

			if (!$product->save()) {
				echo PHP_EOL;
				echo 'Model #' . $key . ' with name - ' . $name . ' has validation errors ' . PHP_EOL;
				echo PHP_EOL;
				var_dump($product);
				var_dump($product->errors); die;
			}

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

}