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
		$markup = self::getHtml();
		$document = \phpQuery::newDocumentHTML($markup);
		$cards = $document->find(".product-tile");
		$items = [];

		$tags = self::getTags();

		foreach($cards as $key => $card) {

			$cardLink = pq($card);
			$item = new Item();

			$name       = $cardLink->find('span.title');
			$price      = $cardLink->find('span.baseprice');
			$price_sale = $cardLink->find('span.salesprice');
			$url        = $cardLink->find('a.product-images-js');

			$item->title      = $name->html();
			$item->price      = str_replace( '.' , '' , trim($price->html()));
			$item->price_sale = str_replace( '.' , '' , trim($price_sale->html()));
			$item->url        = 'https://adidas.ru' . $url->attr('href');
			$item->store_id   = (int) $this->store_id;

			if (self::processFilter($item, $tags)) {
				$item->img = $this->getImg($item->url);
				$item->save();
				$items[] = $item;
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