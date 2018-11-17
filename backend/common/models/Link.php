<?php

namespace common\models;

use Yii;
use yii\behaviors\TimestampBehavior;



/**
 * This is the model class for table "Link".
 *
 * @property int $id
 * @property string $name Имя
 * @property string $status
 */
class Link extends \yii\db\ActiveRecord
{

    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'disabled';

    public $store;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'link';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['status', 'href', 'store'], 'required'],
            [['status', 'name', 'href'], 'string', 'max' => 255],
            [['category_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Имя',
            'status' => 'Статус',
            'category_id' => 'Категория',
        ];
    }

    public function behaviors(): array
    {
        return [
            TimestampBehavior::className()
        ];
    }
}