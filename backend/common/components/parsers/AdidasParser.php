<?php

namespace common\components\parsers;

use common\components\parsers\Parser;
use common\models\Store;
use common\models\Item;
use yii\helpers\Json;
use yii\helpers\VarDumper;


class AdidasParser extends Parser {


	public function run()
	{
		$start = 0;
		$step  = 120;
		$cardsAll = [];
		
		do {
			$markup = self::getHtml($this->url . "?sz=$step&start=$start");
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
			$item = new Item();

			$name = $cardLink->find('span.title')->html();

			if (self::processFilter($name, $tags)) {
				$price      = $cardLink->find('span.baseprice');
				$price_sale = $cardLink->find('span.salesprice');
				$url        = $cardLink->find('.plp-image-bg-link');

				$item->title      = $name;
				$item->price      = str_replace( '.' , '' , trim($price->html()));
				$item->price_sale = str_replace( '.' , '' , trim($price_sale->html()));
				$item->url        = 'https://adidas.ru' . $url->attr('href');
				$item->store_id   = (int) $this->store_id;
				$item->img = $this->getImg($item->url);
				$item->save();
				$items[] = $item;
			}

			echo 'Model #' . $key . ' with name - ' . $name . 'parsed' . PHP_EOL;
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