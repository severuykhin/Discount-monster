<?php

namespace common\behaviors;

use Yii;
use common\models\User;
use yii\base\Behavior;
use yii\base\Controller;
use yii\web\ForbiddenHttpException;

class AccessBehavior extends Behavior
{

    public $header = 'Authorization';
    public $pattern = '/^Bearer\s+(.*?)$/';

    public function events()
    {
        return [
            Controller::EVENT_BEFORE_ACTION => 'beforeAction'
        ];
    }

    public function beforeAction($action)
    {            

        $authHeader = Yii::$app->request->headers->get($this->header);
        if ($authHeader) {
            if (preg_match($this->pattern, $authHeader, $matches)) {
                $token = $matches[1];
                $tokenIsActive = User::find()->where(['auth_key' => $token])->exists();
                if ($tokenIsActive) {
                    return $token;
                }
            } 
            throw new ForbiddenHttpException('Not allowed');
        } else {
            throw new ForbiddenHttpException('Not allowed');
        }
    }
}
