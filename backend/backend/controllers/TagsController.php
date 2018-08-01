<?php
namespace backend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use common\models\Tag;
use yii\helpers\Json;
use yii\helpers\VarDumper;

/**
 * Главный контроллер админки
 * @package backend\controllers
 */
class TagsController extends Controller
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
        if ($action->id == 'create') {
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
		$tags = Tag::find()->asArray()->all();
        return Json::encode($tags);
    }

    /**
     * Add a new tag
     * @return string
     */
    public function actionCreate():string
    {
        if (Yii::$app->request->isPost) {

            $model = new Tag();
            $model->name = Yii::$app->request->post('name');

            if ($model->save()) {
                return Json::encode($model);
            }
        }

        throw new NotFoundHttpException('Page not found');
    }

}
