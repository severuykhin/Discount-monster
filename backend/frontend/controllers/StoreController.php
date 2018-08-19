<?php

namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;
use yii\helpers\VarDumper;
use yii\helpers\Json;

use common\models\Store;
use common\models\Item;

/**
 * Class SiteController
 * @package frontend\controllers
 */
class StoreController extends Controller
{

    /**
     * Подключенные внешние экшены
     * @return array
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    /**
     * Подключенные поведения
     * @return array
     */
    public function behaviors()
	{
		return [
			'verbs' => [
				'class' => VerbFilter::className(),
				'actions' => [
					'index' => ['get']
				],
			],
		];
	}

    /**
     * Главная страница
     * @return string
     */
    public function actionIndex()
	{
        return $this->render('index');
    }


	public function actionAll(): string
	{
        $stores = Store::find()->asArray()->all();

        foreach($stores as $key => $store) {
            $stores[$key]['count'] = Item::find()->where(['store_id' => $store['id']])->count();
        }
        
		return Json::encode([
            'result' => 'ok',
            'items'  => $stores
		]);
	}

}
