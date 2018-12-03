<?php
namespace api\controllers\v1;

use Yii;
use yii\web\Controller;
use common\models\Store;
use common\models\Category;
use common\models\Product;
use common\models\bindings\TagStore;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\helpers\VarDumper;
use common\behaviors\AccessBehavior;

/**
 * Контроллер приложения
 * @package api\v1\controllers
 */
class MainController extends Controller
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
                'exclude' => ['index', 'start']
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'index' => ['get', 'post', 'put', 'patch', 'delete'],
                    'start' => ['get'],
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


    public function actionStart()
    {   

        $categories = Category::find()
                    ->where(['status' => Category::STATUS_ACTIVE])
                    ->asArray()
                    ->all();
        
        $stores = Store::find()
                ->where(['status' => Store::STATUS_ACTIVE])
                ->asArray()
                ->all();

        return [
            'result' => 'ok',
            'data' => [
                'categories' => $categories,
                'stores' => $stores
            ]
        ];
    }

}
