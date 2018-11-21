<?php

namespace common\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\behaviors\SluggableBehavior;
use common\models\bindings\TagStore;
use common\models\Store;



/**
 * This is the model class for table "tag".
 *
 * @property int $id
 * @property string $name Имя
 * @property string $status
 */
class Tag extends \yii\db\ActiveRecord
{

    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tag';
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

    public function behaviors(): array
    {
        return [

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

    public function setValues($data)
    {
        $this->name = $data['name'];
        $this->status = $data['status'];
        return $this;
    }

    public function getStoresshort()
    {
        return $this->hasMany(Store::className(), ['id' => 'store_id'])
                ->viaTable('tag_via_store', ['tag_id' => 'id'])
                ->select(['id']);
    }
}
