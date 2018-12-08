<?php 

namespace common\models\search;

use Yii;
use yii\data\ActiveDataProvider;
use common\models\Product;
use yii\helpers\VarDumper;
use yii\helpers\ArrayHelper;

class ProductSearch 
{
    public $minPrice;

    public $maxPrice;

    public $category;

    public $store;

    public $gender;

    public $sort;

    public function search($params) 
    {

        $query = Product::find()->with(['category']);

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => false,
            'pagination' => [
                'pageSize' => 30,
                'validatePage' => false,
                'forcePageParam' => false,
                'pageSizeParam' => false
            ],
        ]);

        return $dataProvider;
    }
}