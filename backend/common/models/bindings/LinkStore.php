<?php

namespace common\models\bindings;

use Yii;
use yii\behaviors\TimestampBehavior;



/**
 * This is the model class for table "Link_via_store".
 *
 * @property int $id
 * @property string $name Имя
 * @property string $status
 */
class LinkStore extends \yii\db\ActiveRecord
{

    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'disabled';

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'link_via_store';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['link_id', 'store_id'], 'required'],
            [['link_id', 'store_id'], 'integer'],
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
