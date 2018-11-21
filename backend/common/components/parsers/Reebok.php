<?php

namespace common\components\parsers;

use common\components\parsers\Parser;
use common\models\Store;
use common\models\Item;
use common\models\Link;
use yii\helpers\Json;
use yii\helpers\VarDumper;


class Reebok extends Parser {

	public function parseLink(Link $link)
	{
		$start = 0;
		$step  = 120;
		$cardsAll = [];
		
		do {
			$markup = self::getHtml($link->href . "?sz=$step&start=$start");
			$document = \phpQuery::newDocumentHTML($markup);
			$cardsOnPage = $document->find(".product-tile");

			foreach($cardsOnPage as $card) {
				$cardsAll[] = $card;
			}

			$start = $start + $step;

		} while ((int)$cardsOnPage->length() > 0);

		$tags = self::getTags();
		$items = [];

		foreach($cardsAll as $key => $card) {

			$cardLink = pq($card);
			$name = $cardLink->find('span.title')->html();
			$url  = $cardLink->find('a.plp-image-bg-link');
			$art  = $url->attr('data-track');
			
			if (self::processFilter($name, $tags)) {

				$item = Item::find()->where(['art' => $art])->one();
				$new = false;
				if (!$item) {
					$item = new Item();
					$new = true;
					echo 'New item! - ' . $name . ' ' . PHP_EOL;
				}

				$price      = $cardLink->find('span.baseprice');
				$price_sale = $cardLink->find('span.salesprice');
				$gender     = mb_strtolower($cardLink->find('a.product-link .subtitle')->html());
				$ganderVal  = 1; 

				if (strpos($gender, 'муж') !== false) {
					$genderVal = 1;
				} else if (strpos($gender, 'жен') !== false) {
					$genderVal = 2;
				} else {
					$genderVal = 3;
				}

				$config = [
					'title'       => $name,
					'price'       => str_replace( '.' , '' , trim($price->html())),
					'price_sale'  => str_replace( '.' , '' , trim($price_sale->html())),
					'url'         => 'https://reebok.ru' . $url->attr('href'),
					'store_id'    => (int) $this->store_id,
					'gender'      => $genderVal,
					'art'         => $art,
					'category_id' => 1
  				];

				$item->setValues($config);

				if ($new) {
					$item->img = $this->getImg($item->url);
				}

				$item->save();

				$items[] = $item;

				echo 'Model #' . $key . ' with name - ' . $name . ' parsed ' . PHP_EOL;

			}
		}

		return $items;
	}

	protected function getImg(string $url): string
	{
		$markup = self::getHtml($url);
		$document = \phpQuery::newDocumentHTML($markup);
		$img = $document->find('#main-image img');
		return $img->attr('src');
	}

}