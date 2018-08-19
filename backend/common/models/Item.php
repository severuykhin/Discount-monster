<?php

namespace common\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use common\models\Store;

/**
 * This is the model class for table "item".
 *
 * @property int $id
 * @property string $title Название
 * @property string $url Ссылка
 * @property string $price Цена
 * @property string $img Изображение
 * @property int $store_id Магазин
 * @property int $created_at
 * @property int $updated_at
 */
class Item extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'item';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title', 'url'], 'required'],
            [['store_id', 'created_at', 'updated_at'], 'integer'],
            [['title', 'url', 'price', 'img', 'price_sale'], 'string', 'max' => 255],
        ];
    }

    public function behaviors(): array
    {
        return [
            TimestampBehavior::className(),
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Название',
            'url' => 'Ссылка',
            'price' => 'Цена',
            'price_sale' => 'Цена со скидкой',
            'img' => 'Изображение',
            'store_id' => 'Магазин',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public function getStore() 
    {
        return $this->hasOne(Store::className(), ['store_id' => 'id']);
    }
}
