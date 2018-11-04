<?php

namespace common\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\behaviors\SluggableBehavior;
use common\models\Item;



/**
 * This is the model class for table "store".
 *
 * @property int $id
 * @property string $name Имя
 * @property string $url Базовый урл для парсинга
 * @property int $created_at Дата создания
 * @property int $updated_at Дата обновления
 */
class Store extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'store';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'status'], 'required'],
            [['created_at', 'updated_at'], 'integer'],
            [['name'], 'string', 'max' => 200],
            [['status', 'slug'], 'string', 'max' => 255],
            [['slug'], 'unique']
        ];
    }

    public function behaviors(): array
    {
        return [
            TimestampBehavior::className(),
            [
                'class' => SluggableBehavior::className(),
                'attribute' => 'name',
            ],
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
            'slug' => 'Слаг',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}
