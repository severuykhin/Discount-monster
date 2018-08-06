<?php
namespace backend\controllers;

use common\models\Item;
use common\models\Store;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\helpers\Json;

use common\components\parsers\ParserFactory;
use common\components\MessageEventHandler;
use yii\helpers\VarDumper;

/**
 * Главный контроллер админки
 * @package backend\controllers
 */
class ParserController extends Controller
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
                    'index' => ['post'],
                    'check'  => ['get']
                ],
            ],
        ];
	}
	
	/**
     * @inheritdoc
     */
    public function beforeAction($action)
    {            
        if ($action->id == 'index') {
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
     * Инициализация парсера
     * @return string
     */
    public function actionIndex()
    {

        if (Yii::$app->request->isPost) {

            $id = Yii::$app->request->post('id');

            $store = Store::findOne($id);
    
            if (!$store) {
                throw new NotFoundHttpException('Store not found');
            }

            Item::deleteAll(['store_id' => $id]);

            $parser = ParserFactory::get($store->name);
            $parser->load($store);
            $items = $parser->run();

            return Json::encode($items);
        }

        throw new NotFoundHttpException('Store not found');

    }
}
