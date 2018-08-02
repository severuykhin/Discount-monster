<?php
namespace backend\controllers;

use Yii;
use common\models\Store;
use yii\web\Controller;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\helpers\Json;
use yii\helpers\VarDumper;

/**
 * Главный контроллер админки
 * @package backend\controllers
 */
class StoreController extends Controller
{

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
                    'index' => ['get'],
                ],
            ],
        ];
	}
	
	/**
     * @inheritdoc
     */
    public function beforeAction($action)
    {            
        if ($action->id == 'create' || $action->id == 'delete') {
            $this->enableCsrfValidation = false;
        }

        return parent::beforeAction($action);
    }

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
     * Get all tags
     * @return string
     */
    public function actionIndex(): string
    {
		$stores = Store::find()->asArray()->all();
        return Json::encode($stores);
	}
	
	public function actionCreate()
	{	
		if (Yii::$app->request->isPost) {
			$model = new Store();
			if ($model->load(Yii::$app->request->post()) && $model->save()) {
				return Json::encode($model);
			}
		}

        throw new NotFoundHttpException('Page not found');
	}

}
