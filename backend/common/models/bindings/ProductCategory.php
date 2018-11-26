<?php

namespace common\models\bindings;

use Yii;

/**
 * This is the model class for table "product_category".
 *
 * @property int $id
 * @property int $product_id
 * @property int $category_id
 */
class ProductCategory extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'product_category';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['product_id', 'category_id'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'product_id' => 'Product ID',
            'category_id' => 'Category ID',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \common\models\query\ProductCategoryQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\query\ProductCategoryQuery(get_called_class());
    }
}
