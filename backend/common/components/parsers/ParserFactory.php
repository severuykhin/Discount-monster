<?php

namespace common\components\parsers;

use common\components\parsers\NikeParser;
use common\components\parsers\AdidasParser;

/**
 * Represents a Parser factory class
 */
class ParserFactory {

	private function types() 
	{
		return [
			'Nike' => new NikeParser(),
			'Adidas' => new AdidasParser()
		];
	}

	public static function get($type): Parser
	{
		return self::types()[$type];
	}

}
