<?php

namespace common\components\parsers;

use common\components\parsers\Parser;
use common\models\Store;
use yii\helpers\Json;
use yii\helpers\VarDumper;


class AdidasParser extends Parser {


	public function run()
	{
		$markup = self::getHtml();
		$document = \phpQuery::newDocumentHTML($markup);
		$cards = $document->find(".product-tile");
		$items = [];

		foreach($cards as $card) {

			$cardLink = pq($card);

			$name = $cardLink->find('span.title');
			$salePrice =$cardLink->find('span.salesprice');

			$items[] = [
				'name' => $name->html(),
				'saleprice' => trim($salePrice->html())
			];
		}

		return $items;
	}

}