<?php
namespace api\controllers\v1;

use Yii;
use yii\web\Controller;
use common\models\Link;
use common\models\bindings\LinkStore;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\helpers\VarDumper;
use common\behaviors\AccessBehavior;


/**
 * Контроллер ссылок
 * @package api\v1\controllers
 */
class LinksController extends Controller
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
        // $categories = Category::find()->all();
        return [
            'result' => 'ok',
            // 'data'   => $categories
        ];
    }

    private function create($request)
    {

        $data = $request->getBodyParams();
        $linkModel = new Link();

        $linkModel->name = $data['name'];
        $linkModel->category_id = $data['category'];
        $linkModel->status = $data['status'];
        $linkModel->href = $data['href'];
        $linkModel->store = $data['store'];

        if ($linkModel->save()) {

            $storeBinding = $this->createLinkToStoreBinding($linkModel);

            if (empty($storeBinding->errors)) {
                return [ 'result' => 'ok', 'model' => $linkModel ];
            } else {
                return [ 'result' => 'error', 'errors' => $storeBinding->errors ];
            }

        } else {
            return [ 'result' => 'error', 'errors' => $linkModel->errors ];
        }
    }

    private function createLinkToStoreBinding(Link $linkModel)
    {
        $linkToStoreModel = new LinkStore();
        $linkToStoreModel->link_id = $linkModel->id;
        $linkToStoreModel->store_id = $linkModel->store;

        if ($linkToStoreModel->save()) {
            return true;
        } else return $linkToStoreModel;
    }

    private function delete($id)
    {
        // $model  = Category::find()->where(['id' => $id])->one();

        // if (!$model) {
        //     throw new NotFoundHttpException('Page not found');
        // }

        // if ($model->delete()) {
        //     return [
        //         'result' => 'ok',
        //     ];
        // } else {
        //     return [
        //         'result'  => 'error',
        //         'message' => 'CATEGORY: Could not delete model id-' . $id,
        //         'errors'  => $model->errors
        //     ];
        // }
    }
}
