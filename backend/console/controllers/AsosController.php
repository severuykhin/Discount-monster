<?php

namespace console\controllers;

use Yii;
use yii\helpers\Json;
use common\models\Item;
use common\models\Store;
use common\components\parsers\ParserFactory;
use common\components\parsers\Parser;
use yii\console\Controller;

class AsosController extends Controller
{

    public function actionIndex()
    {
		echo "Asos parser run"; 		

		$this->parse([
			'url' => 'https://store.nike.com/ru/ru_ru/pw/%D0%BC%D1%83%D0%B6%D1%87%D0%B8%D0%BD%D1%8B-%D1%80%D0%B0%D1%81%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B6%D0%B0/47Z7pu?ipp=1000',
			'gender' => 1,
		]);
	}
	
	public function parse(array $config)
	{
		$parser = ParserFactory::get('Asos');
		$parser->store_id = 14;
		$parser->run($config);
	}
    
}