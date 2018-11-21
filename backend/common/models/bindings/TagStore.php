<?php

namespace common\models\bindings;

use Yii;

/**
 * This is the model class for table "Tag_via_store".
 *
 * @property int $id
 * @property string $name Имя
 * @property string $status
 */
class TagStore extends \yii\db\ActiveRecord
{

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tag_via_store';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tag_id', 'store_id'], 'required'],
            [['tag_id', 'store_id'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
        ];
    }
}
