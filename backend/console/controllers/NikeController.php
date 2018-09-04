<?php

namespace console\controllers;

use Yii;
use yii\helpers\Json;
use common\models\Item;
use common\models\Store;
use common\components\parsers\ParserFactory;
use common\components\parsers\Parser;
use yii\console\Controller;

class NikeController extends Controller
{

    public function actionIndex()
    {
		echo "Nike parser run" . PHP_EOL;

		$this->parse([
			'url' => 'https://store.nike.com/ru/ru_ru/pw/%D0%BC%D1%83%D0%B6%D1%87%D0%B8%D0%BD%D1%8B-%D1%80%D0%B0%D1%81%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B6%D0%B0/47Z7pu?ipp=1000',
			'gender' => 1
		]);

		$this->parse([
			'url' => 'https://store.nike.com/ru/ru_ru/pw/%D0%B6%D0%B5%D0%BD%D1%89%D0%B8%D0%BD%D1%8B-%D1%80%D0%B0%D1%81%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B6%D0%B0/47Z7pt?ipp=1000',
			'gender' => 2
		]);
	}
	
	private function parse(array $config)
	{
		$parser = ParserFactory::get('Nike');
		$items = $parser->run($config);
		$amount = count($items);

		echo "Job is done! Parsed $amount items" . PHP_EOL;
	}
    

}