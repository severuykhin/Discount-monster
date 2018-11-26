<?php

namespace common\models\bindings;

use Yii;

/**
 * This is the model class for table "product_store".
 *
 * @property int $id
 * @property int $product_id
 * @property int $store_id
 */
class ProductStore extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'product_store';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['product_id', 'store_id'], 'integer'],
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
            'store_id' => 'Store ID',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \common\models\query\ProductStoreQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\query\ProductStoreQuery(get_called_class());
    }
}
