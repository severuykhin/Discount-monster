<?php
namespace api\controllers\v1;

use Yii;
use yii\web\Controller;
use common\models\Tag;
use common\models\bindings\LinkStore;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\helpers\VarDumper;
use common\behaviors\AccessBehavior;


/**
 * Контроллер тегов фильтрации
 * @package api\v1\controllers
 */
class TagsController extends Controller
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

        if (Yii::$app->request->isPatch) {
            return $this->update(Yii::$app->request);
        }

        if (Yii::$app->request->isDelete) {
            return $this->delete(Yii::$app->request->get('id'));
        }
    }

    private function get($request) 
    {
        $tags = Tag::find();

        if ($request->get('expand')) {
            $expandValues = explode(',', $request->get('expand'));
            $tags->with($expandValues);
        }

        if ($request->get('expandShort')) {
            $expandShortValues = explode(',', $request->get('expandShort'));
            $expandShortValues = array_map(function ($item) {
                return $item . 'short';
            }, $expandShortValues);
            $tags->with($expandShortValues);
        }

        return [
            'result' => 'ok',
            'data'   => $tags->asArray()->all()
        ];
    }

    private function create($request)
    {

        $data = $request->post('Tag');
        $tagModel = new Tag();

        $tagModel->setValues($data);

        if ($tagModel->save()) {

            return [ 'result' => 'ok', 'data' => $tagModel ];

        } else {
            return [ 'result' => 'error', 'errors' => $tagModel->errors ];
        }
    }

    private function update($request) 
    {
        $tagModel = Tag::find()->where(['id' => $request->get('id')])->one();
        
        $data = $request->post('Tag');

        $tagModel->setValues($data);

        if ($tagModel->save()) {
            return [ 
                'result' => 'ok', 
                'data' => $tagModel 
            ];
        } else {
            return [ 'result' => 'error', 'errors' => $linkModel->errors ];
        }
    }

    private function delete($id)
    {
        $model  = Tag::find()->where(['id' => $id])->one();

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
                'message' => 'TAG: Could not delete model id-' . $id,
                'errors'  => $model->errors
            ];
        }
    }
}
