<?php

namespace common\behaviors;

use Yii;
use common\models\User;
use yii\base\Behavior;
use yii\base\Controller;
use yii\web\ForbiddenHttpException;

class AccessBehavior extends Behavior
{
    public function events()
    {
        return [
            Controller::EVENT_BEFORE_ACTION => 'beforeAction'
        ];
    }

    public function beforeAction($action)
    {            
        $headers = Yii::$app->request->headers;
        if (!empty($headers->get('token'))) {
            $token = $headers->get('token');
            $tokenIsActive = User::find()->where(['auth_key' => $token])->one();
            if (!$tokenIsActive) {
                throw new ForbiddenHttpException('Not allowed');
            }

        } else {
            throw new ForbiddenHttpException('Not allowed');
        }
    }
}
