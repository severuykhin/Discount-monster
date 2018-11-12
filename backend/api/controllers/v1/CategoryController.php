<?php
namespace api\controllers\v1;

use Yii;
use yii\web\Controller;
use common\models\Category;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\helpers\VarDumper;
use common\behaviors\AccessBehavior;

/**
 * Контроллер категорий
 * @package api\v1\controllers
 */
class CategoryController extends Controller
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
            return $this->createCategory(Yii::$app->request);
        }

        if (Yii::$app->request->isGet) {
            return $this->getCategories(Yii::$app->request);
        }

        if (Yii::$app->request->isDelete) {
            return $this->deleteCategory(Yii::$app->request->get('id'));
        }
    }

    private function getCategories() 
    {
        $categories = Category::find()->all();
        return [
            'result' => 'ok',
            'data'   => $categories
        ];
    }

    private function createCategory($request)
    {

        $model = new Category();
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

    private function deleteCategory($id)
    {
        $model  = Category::find()->where(['id' => $id])->one();

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
}
