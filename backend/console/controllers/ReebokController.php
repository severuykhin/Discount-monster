<?php

namespace console\controllers;

use Yii;
use yii\helpers\Json;
use common\models\Item;
use common\models\Store;
use common\components\parsers\ParserFactory;
use common\components\parsers\Parser;
use yii\console\Controller;

class ReebokController extends Controller
{

    public function actionIndex()
    {
		$store = Store::findOne(9);

		echo "Reebok parser run";

		if (!$store) {
			throw new NotFoundHttpException('Store not found');
		}

		Item::deleteAll(['store_id' => 9]);

		$parser = ParserFactory::get($store->name);
		$parser->load($store);
		$items = $parser->run();
    }
    

}