<?php

namespace common\components\parsers;

use common\components\parsers\Parser;
use common\models\Store;
use common\models\Item;

class AsosParser extends Parser {


	public function run(array $config)
	{
		$this->url = $config['url'];
		$page      = 1;
		$cardsAll  = [];
		do {
			$markup = self::getHtml($this->url);
			$document = \phpQuery::newDocumentHTML($markup);
			$cardsOnPage = $document->find("._2oHs74P");
			
			foreach($cardsOnPage as $card) {
				$cardsAll[] = $card;
			}

			$page++;

		} while ((int)$cardsOnPage->length() > 0);

		var_dump(count($cardsAll));
	}

}