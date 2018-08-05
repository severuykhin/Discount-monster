<?php

namespace common\components\parsers;

use common\components\parsers\NikeParser;
use common\components\parsers\AdidasParser;
use common\components\parsers\ReebokParser;

/**
 * Represents a Parser factory class
 */
class ParserFactory {

	private function types() 
	{
		return [
			'Nike'   => new NikeParser(),
			'Adidas' => new AdidasParser(),
			'Reebok' => new ReebokParser()
		];
	}

	public static function get($type): Parser
	{
		return self::types()[$type];
	}

}
