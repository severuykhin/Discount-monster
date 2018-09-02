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
            [['store_id', 'created_at', 'updated_at', 'gender', 'category_id', 'like'], 'integer'],
            [['title', 'url', 'img', 'art'], 'string', 'max' => 255],
            [['price', 'price_sale'], 'safe']
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
            'like' => 'Добавление в избранное',
            'price_sale' => 'Цена со скидкой',
            'img' => 'Изображение',
            'store_id' => 'Магазин',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public function getStore() 
    {
        return $this->hasOne(Store::className(), ['id' => 'store_id']);
    }

    public function setValues(array $config)
    {
        $this->title = $config['title'];
        $this->price = $config['price'];
        $this->price_sale = $config['price_sale'];
        $this->url = $config['url'];
        $this->gender = $config['gender'];
        $this->store_id = $config['store_id'];
        $this->art = $config['art'];
        $this->category_id = $config['category_id'];
    }
}
