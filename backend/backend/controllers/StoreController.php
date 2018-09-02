<?php
namespace backend\controllers;

use Yii;
use common\models\Store;
use common\models\Item;
use common\models\search\ItemsSearch;
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
                    'single' => ['get'],
                    'items'  => ['get'],
                    'update' => ['post']
                ],
            ],
        ];
	}
	
	/**
     * @inheritdoc
     */
    public function beforeAction($action)
    {            
        if ($action->id == 'create' || $action->id == 'delete' || $action->id == 'update') {
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
     * Get all store
     * @return string
     */
    public function actionIndex(): string
    {
		$stores = Store::find()->asArray()->all();
        return Json::encode($stores);
	}
    
    /**
     * Create new store
     * @return string
     */
	public function actionCreate(): string
	{	
		if (Yii::$app->request->isPost) {
			$model = new Store();
			if ($model->load(Yii::$app->request->post()) && $model->save()) {
				return Json::encode($model);
			}
		}

        throw new NotFoundHttpException('Page not found');
    }
    

    /**
     * Delete store
     * @return string
     */

    public function actionDelete(): string
    {
        if (Yii::$app->request->isPost) {

            $id = Yii::$app->request->post('id');
            $model = Store::findOne($id);
            if ($model->delete()) {
                return Json::encode(['result' => 'ok']);
            }
        }

        throw new NotFoundHttpException('Page not found');

    }


    /**
     * Get store
     * @return string
     */
    public function actionSingle($id): string
    {
        $store = Store::findOne($id);
        if (!$store) {
            throw new NotFoundHttpException('Page not found');
        }

        $query = Item::find()
                    ->where(['store_id' => $id]);

        $count = $query->count(); 
        $items = ItemsSearch::findBy(Yii::$app->request->get());
        
        return Json::encode([
            'store' => $store,
            'items' => $items,
            'count' => $count
        ]);
    }

    public function actionItems($id): string
    { 
        $items = ItemsSearch::findBy(Yii::$app->request->get());
        
        return Json::encode([
            'items' => $items,
        ]);
    }

    public function actionUpdate($id): string
    {
        if (Yii::$app->request->isPost) {
            $model = Store::findOne($id);
            $model->name = Yii::$app->request->post('name');
            $model->url  = Yii::$app->request->post('url');
            $model->slug = Yii::$app->request->post('slug');
            if ($model->save()) {
                return Json::encode($model);
            }
        }

        throw new NotFoundHttpException('Page not found');

    }

}
