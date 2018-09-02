<?php
namespace backend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use common\models\Item;
use yii\helpers\Json;
use yii\helpers\VarDumper;

/**
 * Контроллер товара
 * @package backend\controllers
 */
class ItemController extends Controller
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
                    'delete' => ['post'],
                    'create' => ['post']
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
		// TO DO
    }

    /**
     * Add a new tag
     * @return string
     */
    public function actionCreate(): string
    {
        // TO DO

        throw new NotFoundHttpException('Page not found');
    }

    public function actionDelete(): string
    {   
        if (Yii::$app->request->isPost) {
            $model = Item::findOne(Yii::$app->request->post('id'));
            $model->delete();

            return Json::encode(['result' => 'ok']);
        }

        throw new NotFoundHttpException('Page not found');
    }

}
