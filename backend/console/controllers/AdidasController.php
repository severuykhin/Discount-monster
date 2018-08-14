<?php

namespace console\controllers;

use Yii;
use yii\helpers\Json;
use common\models\Item;
use common\models\Store;
use common\components\parsers\ParserFactory;
use common\components\parsers\Parser;
use yii\console\Controller;

class AdidasController extends Controller
{

    public function actionIndex($message = 'hello world')
    {
		$store = Store::findOne(10);

		echo "Adidas parser run";

		if (!$store) {
			throw new NotFoundHttpException('Store not found');
		}

		Item::deleteAll(['store_id' => 10]);

		$parser = ParserFactory::get($store->name);
		$parser->load($store);
		$items = $parser->run();
		$amount = count($items);

		echo "Job is done! Parsed $amount items" . PHP_EOL;
    }
    

}