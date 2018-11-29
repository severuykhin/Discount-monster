<?php

namespace common\components\parsers;

use common\components\parsers\Nike;
use common\components\parsers\Adidas;
use common\components\parsers\Reebok;
use common\components\parsers\Asos;

/**
 * Represents a Parser factory class
 */
class ParserFactory {

	private function types() 
	{
		return [
			new Nike(),
			// new Adidas(),
			new Reebok(),
			// 'Asos'   => new Asos()
		];
	}

	public static function get($type): Parser
	{
		return self::types()[$type];
	}

	public static function getAll()
	{
		return self::types();
	}

}
