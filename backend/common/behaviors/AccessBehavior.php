<?php

namespace common\behaviors;

use Yii;
use common\models\User;
use yii\base\Behavior;
use yii\helpers\VarDumper;
use yii\base\Controller;
use yii\web\ForbiddenHttpException;

class AccessBehavior extends Behavior
{

    public $header = 'Authorization';
    public $pattern = '/^Bearer\s+(.*?)$/';
    public $exclude = [];



    public function events()
    {
        return [
            Controller::EVENT_BEFORE_ACTION => 'beforeAction'
        ];
    }

    public function beforeAction($actionEvent)
    {            
        if (in_array($actionEvent->action->id, $this->exclude)) return null;

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
