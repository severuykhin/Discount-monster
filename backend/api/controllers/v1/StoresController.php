<?php
namespace api\controllers\v1;

use Yii;
use yii\web\Controller;
use common\models\Store;
use common\models\bindings\TagStore;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\helpers\VarDumper;
use common\behaviors\AccessBehavior;

/**
 * Контроллер категорий
 * @package api\v1\controllers
 */
class StoresController extends Controller
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
                'class' => AccessBehavior::className(),
                'exclude' => ['index']
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
            return $this->create(Yii::$app->request);
        }

        if (Yii::$app->request->isGet) {
            return $this->get(Yii::$app->request);
        }

        if (Yii::$app->request->isDelete) {
            return $this->delete(Yii::$app->request->get('id'));
        }
    }

    private function get() 
    {
        $stores = Store::find()->all();
        return [
            'result' => 'ok',
            'data'   => $stores
        ];
    }

    private function create($request)
    {

        $model = new Store();
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

    private function delete($id)
    {
        $model  = Store::find()->where(['id' => $id])->one();

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
                'message' => 'CATEGORY: Could not delete model id-' . $id,
                'errors'  => $model->errors
            ];
        }
    }

    // Relations actions

    public function actionTags($id)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        if (Yii::$app->request->isGet) {
            return $this->getTags($id);
        }

        if (Yii::$app->request->isPatch) {
            return $this->updateTags(Yii::$app->request, $id);
        }
    }

    private function getTags($id)
    {   
        $store = Store::find()->where(['id' => $id])->with(['tags'])->one();

        return [
            'result' => 'ok',
            'data' => $store->tags
        ];
    }

    private function updateTags($request, $id) 
    {
        $store = Store::find()->where(['id' => $id])->one();
        if (!$store) {
            throw new NotFoundHttpException('Page not found');
        }

        TagStore::deleteAll(['store_id' => $store->id]);

        $newBindings = $request->getBodyParams();

        $errors = [];

        foreach($newBindings as $tagId) {
            $bindingModel = new TagStore();
            $bindingModel->store_id = $store->id;
            $bindingModel->tag_id = $tagId;

            if ($bindingModel->save()) {

            } else {
                $errors[] = $bindingModel->errors;
            }
        }

        if (count($errors) > 0) {
            return [
                'result' => 'error',
                'errors' => $errors
            ];
        }

        return [
            'result' => 'ok'
        ];
    }
}
