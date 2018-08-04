<?php

namespace common\components\parsers;

use common\components\parsers\Parser;
use common\models\Store;

class NikeParser extends Parser {


	public function run()
	{
		$markup = self::getHtml();

		return $markup;
	}

}