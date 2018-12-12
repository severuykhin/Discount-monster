<?php

namespace frontend\widgets;

use yii\base\Widget;
use common\models\Category;
use common\models\Store;

class Navigation extends Widget
{
    public function init()
    {
        parent::init();
    }

    public function run()
    {
        $categories = Category::find()->where(['status' => Category::STATUS_ACTIVE])->all();
        $stores = Store::find()->where(['status' => Store::STATUS_ACTIVE])->all();

        return $this->render('navigation', [
            'categories' => $categories,
            'stores'     => $stores
        ]);
    }
}