<?php

namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;
use common\models\Product;

class ProductController extends Controller
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

    public function actionIndex($slug)
    {
        $product = Product::find()
                    ->where(['slug' => $slug])
                    ->with(['category', 'store', 'genders'])
                    ->one();

        return $this->render('index', [
            'model' => $product
        ]);
    }
}