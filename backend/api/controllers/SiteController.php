<?php
namespace api\controllers;

use common\models\Widget;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\rest\Controller;
use backend\models\form\Login;
use yii\filters\VerbFilter;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;

use yii\helpers\VarDumper;

/**
 * Главный контроллер api
 * @package backend\controllers
 */
class SiteController extends Controller
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

	/**
	 * Страница авторизации
	 * @return string|\yii\web\Response
	 */
	public function actionLogin()
	{
        
		$model = new Login();
		if ($model->load(Yii::$app->request->post()) && $model->login()) {
            $user = $model->getUser();
            return [
                'result' => 'ok',
                'data' => [
                    'username' => $user->username,
                    'auth_key' => $user->auth_key,
                    'id'       => $user->id
                ]
                ];
		} else {
            return [
                'result' => 'error',
                'error'  => 'Invalid username or password'
            ];
		}
	}

    /**
     * Отображение главной страницы
     * @return string
     */
    public function actionIndex()
    {
        return 'index page';
    }

    /**
     * Страница выхода
     * @return \yii\web\Response
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

}
