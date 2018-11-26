<?php

namespace common\models\bindings;

use Yii;

/**
 * This is the model class for table "product_gender".
 *
 * @property int $id
 * @property int $product_id
 * @property int $gender
 */
class ProductGender extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'product_gender';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['product_id', 'gender'], 'integer'],
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
            'gender' => 'Gender',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \common\models\query\ProductGenderQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\query\ProductGenderQuery(get_called_class());
    }
}
