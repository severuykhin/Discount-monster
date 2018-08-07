<?php

namespace common\components\parsers;

use common\components\parsers\Parser;
use common\models\Store;
use common\models\Item;
use common\models\Tag;
use yii\helpers\Json;
use yii\helpers\VarDumper;


class ReebokParser extends Parser {


	public function run()
	{
		$markup = self::getHtml();
		$document = \phpQuery::newDocumentHTML($markup);
		$cards = $document->find(".product-tile");
		$items = [];

		$tags = Tag::find()->all();

		foreach($cards as $key => $card) {

			$cardLink = pq($card);
			$item = new Item();

			$name       = $cardLink->find('span.title');
			$price      = $cardLink->find('span.baseprice');
			$price_sale = $cardLink->find('span.salesprice');
			$url        = $cardLink->find('a.plp-image-bg-link');

			$item->title      = $name->html();
			$item->price      = str_replace( '.' , '' , trim($price->html()));
			$item->price_sale = str_replace( '.' , '' , trim($price_sale->html()));
			$item->url        = 'https://reebok.ru' . $url->attr('href');
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