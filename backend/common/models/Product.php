<?php

namespace common\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use common\models\bindings\ProductStore;
use common\models\bindings\ProductCategory;
use common\models\bindings\ProductGender;

/**
 * This is the model class for table "product".
 *
 * @property int $id
 * @property string $name
 * @property string $uniqueId
 * @property string $price
 * @property string $price_sale
 * @property int $discount
 * @property string $img
 * @property string $url
 */
class Product extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'product';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'url'], 'required'],
            [['price', 'price_sale'], 'number'],
            [['discount'], 'integer'],
            [['name', 'uniqueId', 'img', 'url', 'source'], 'string', 'max' => 255],
        ];
    }

    public function behaviors()
    {
        return [
            TimestampBehavior::className()
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'uniqueId' => 'Unique ID',
            'price' => 'Price',
            'price_sale' => 'Price Sale',
            'discount' => 'Discount',
            'img' => 'Img',
            'url' => 'Url',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \common\models\query\ProductQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\query\ProductQuery(get_called_class());
    }

    public function setValues($config)
    {
        $this->name = $config['name'];
        $this->price = $config['price'];
        $this->price_sale = $config['price_sale'];
        $this->discount = $config['discount'];
        $this->url = $config['url'];
        $this->uniqueId = $config['uniqueId']; 
        $this->source = $config['source'];
    }

    public function updateStoreBinding($config)
    {
        $model = ProductStore::find()
                ->where(['product_id'  => $config['product_id']])
                ->andWhere(['store_id' => $config['store_id']])
                ->one();

        if(!$model) {
            $model = new ProductStore();
        }

        $model->store_id = $config['store_id'];
        $model->product_id = $config['product_id'];

        $model->save();
    }
    
    public function updateCategoryBinding($config)
    {
        $model = ProductCategory::find()
                ->where(['product_id'  => $config['product_id']])
                ->andWhere(['category_id' => $config['category_id']])
                ->one();

        if(!$model) {
            $model = new ProductCategory();
        }

        $model->category_id = $config['category_id'];
        $model->product_id = $config['product_id'];

        $model->save();
    }

    public function updateGenderBinding($config)
    {
        $model = ProductGender::find()
                ->where(['product_id'  => $config['product_id']])
                ->one();

        if(!$model) {
            $model = new ProductGender();
        }

        if ($model->gender && $model->gender !== $config['gender']) {
            $model->gender = ProductGender::UNI;
        } else {
            $model->gender = $config['gender'];
        }

        $model->product_id = $config['product_id'];

        $model->save();
    }
}