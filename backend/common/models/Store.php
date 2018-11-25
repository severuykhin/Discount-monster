<?php

namespace common\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\behaviors\SluggableBehavior;
use common\models\Item;
use common\models\Link;
use common\models\Tag;



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

    const STATUS_ACTIVE = 'active';
    const STATUS_DISABLED = 'disabled';

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

    public function getLinks()
    {
        return $this->hasMany(Link::className(), ['id' => 'link_id'])
        ->viaTable('link_via_store', ['store_id' => 'id']);
    }

    public function getActiveLinks()
    {
        return $this->getLinks()->where(['status' => Link::STATUS_ACTIVE])->all();
    }

    public function getTags()
    {
        return $this->hasMany(Tag::className(), ['id' => 'tag_id'])
                ->viaTable('tag_via_store', ['store_id' => 'id']);
    }
}
