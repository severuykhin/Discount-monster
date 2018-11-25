<?php
namespace backend\controllers;

use Yii;
use yii\web\Controller;
use common\models\Tag;
use common\models\bindings\TagsStore;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\helpers\VarDumper;
use yii\helpers\Json;
use common\behaviors\AccessBehavior;

/**
 * Контроллер магазинов
 * @package backend\controllers
 */
class TagController extends Controller
{

    public $enableCsrfValidation = false;

    /**
     * Подключенные поведения
     * @return array
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessBehavior::className()
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'index' => ['get', 'post', 'put', 'patch', 'delete'],
                ],
            ],
        ];
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

    public function actionIndex()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        if (Yii::$app->request->isPost) {
            return $this->createTag(Yii::$app->request);
        }

        if (Yii::$app->request->isGet) {
            return $this->getTags(Yii::$app->request);
        }

        if (Yii::$app->request->isDelete) {
            return $this->deleteTag(Yii::$app->request->get('id'));
        }
    }

    private function getTags() 
    {
        $tags = Tag::find()->all();
        return [
            'result' => 'ok',
            'data'   => $tags
        ];
    }

    private function createTag($request)
    {

        $model = new Tag();
        $model->load($request->post());
        if ($model->save()) {
            return [
                'result' => 'ok',
                'data' => $model
            ];
        } else {
            return [
                'result' => 'error',
                'errors' => $model->errors
            ];
        }
    }

    private function deleteTag($id)
    {
        $model  = Tag::find()->where(['id' => $id])->one();
        TagStore::deleteAll(['tag_id' => $tag->id]);

        if (!$model) {
            throw new NotFoundHttpException('Page not found');
        }

        if ($model->delete()) {
            return [
                'result' => 'ok',
            ];
        } else {
            return [
                'result'  => 'error',
                'message' => 'TAGS: Could not delete model id-' . $id,
                'errors'  => $model->errors
            ];
        }
    }

}
