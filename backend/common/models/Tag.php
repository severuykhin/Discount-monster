<?php

namespace common\models;

use Yii;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "tag".
 *
 * @property int $id
 * @property string $name Имя
 * @property int $created_at Дата создания
 * @property int $updated_at Дата обновления
 */
class Tag extends \yii\db\ActiveRecord
{
    const STATUS_ALL = 0;
    /**
     * @inheritdoc
     */
    public static function tableName(): string
    {
        return 'tag';
    }

    /**
     * @inheritdoc
     */
    public function rules(): array
    {
        return [
            ['name', 'required'],
            [['created_at', 'updated_at'], 'integer'],
            [['name'], 'string', 'max' => 200],
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
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}
