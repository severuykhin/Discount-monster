<?php

namespace common\components\parsers;

use common\components\parsers\Parser;
use common\models\Store;
use common\models\Item;

class Nike extends Parser {


	public function run(array $config): array
	{	

		$this->url = $config['url'];
		$this->store_id = 15;

		$markup = self::getHtml();
		$document = \phpQuery::newDocumentHTML($markup);
		$cards = $document->find(".grid-item");
		$items = [];

		$tags = self::getTags();

		foreach($cards as $key => $card) {
			$cardLink = pq($card);
			$name = $cardLink->find('.product-display-name')->html();
			$url  = $cardLink->attr('data-pdpurl');
			$art  = $cardLink->attr('data-pdpurl');

			// If no match allowed tag names - just go to next item
			if (!self::processFilter($name, $tags)) continue;

			$item = Item::find()->where(['art' => $art])->one();
			$new = false;

			if (!$item) {
				$item = new Item();
				$new = true;
				echo 'New item! - ' . $name . ' ' . PHP_EOL;
			}

			$price      = $cardLink->find('span.overridden');
			$price_sale = $cardLink->find('span.local');

			$config = [
				'title'       => $name,
				'price'       => str_replace( ['.руб', ' '] , '' , trim($price->html())),
				'price_sale'  => str_replace( ['.руб', ' '] , '' , trim($price_sale->html())),
				'url'         => $url,
				'store_id'    => 15,
				// If item already been parsed with another gender group
				// It probably in each gender group - so its kind a multigender item
				// 'gender'      => ($item && $item->gender != $config['gender']) ? 3 :$config['gender'], ######### FIX ME
				'gender'      => $config['gender'],
				'art'         => $art,
				'category_id' => 1,

			];

			$item->setValues($config);
			$item->img = $cardLink->find('img')->attr('src');

			$item->save();

			$items[] = $item;

			echo 'Model #' . $key . ' with name - ' . $name . ' parsed ' . PHP_EOL;

		}

		return $items;
	}

}