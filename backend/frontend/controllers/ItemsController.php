<?php

namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;
use yii\helpers\VarDumper;
use yii\helpers\Json;

use common\models\Item;
use common\models\search\ItemsSearch;

/**
 * Class ItemController
 * @package frontend\controllers
 */
class ItemsController extends Controller
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

        $searchModel = new ItemsSearch();
        $data        = $searchModel->find(Yii::$app->request->get());

        return Json::encode([
            'result' => 'ok',
            'data'   => $data
		]);
    }
    
    public function actionFavorites()
    {
        $items = Item::find()
                    ->where(['id' => Yii::$app->request->get('items')])
                    ->with('store')
                    ->asArray()
                    ->all();
        
        return Json::encode([
            'result' => 'ok',
            'data'   => $items
        ]);
    }

}
