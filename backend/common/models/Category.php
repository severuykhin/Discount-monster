<?php

namespace common\models;

use Yii;
use common\models\Link;
use common\models\Product;


/**
 * This is the model class for table "category".
 *
 * @property int $id
 * @property string $name Имя
 * @property string $status
 */
class Category extends \yii\db\ActiveRecord
{

    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'category';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'status'], 'required'],
            [['status', 'name'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'status' => 'Статус',
        ];
    }

    public function getLinks()
    {
        return $this->hasMany(Link::className(), ['id' => 'category_id']);
    }

    public function getProductcount()
    {
        return $this->hasMany(Product::className(), ['id' => 'product_id'])
            ->viaTable('product_category', ['category_id' => 'id']);
    }

    public function getProducts()
    {
        return $this->hasMany(Product::className(), ['id' => 'product_id'])
                ->viaTable('product_category', ['category_id' => 'id']);
    }
}
