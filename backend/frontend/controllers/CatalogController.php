<?php

namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;
use yii\helpers\VarDumper;
use common\models\search\ProductSearch;
use common\models\Store;
use common\models\Category;

/**
 * Отображение страниц сайта
 * Class SiteController
 * @package frontend\controllers
 */
class CatalogController extends Controller
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
    
    public function actionIndex()
    {
        return $this->render('index', [
            'catalogType' => 'all'
        ]);
    }

    public function actionStore($slug) 
    {

        $store = Store::find()
                    ->where(['slug' => $slug])
                    ->andWhere(['status' => Store::STATUS_ACTIVE])
                    ->one();

        if (!$store) {
            throw new NotFoundHttpException('The requested page does not exist.');
        }

        $productsSearch = new ProductSearch();
        // VarDumper::dump(Yii::$app->request->get(), 10, true); die;
        $dataProvider = $productsSearch->search(array_merge(Yii::$app->request->get(), ['type' => 'store']), $store);

        return $this->render('index', [
            'baseEntity'     => $store,
            'dataProvider'   => $dataProvider,
            'catalogType'    => 'store',
            'searchModel'    => $productsSearch
        ]);
    }

    public function actionCategory($slug) 
    {

        return $this->render('index', [
            'catalogType' => 'category'
        ]);
    }

}
