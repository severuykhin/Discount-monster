<?php

namespace common\models;

use Yii;
use common\models\Store;
use common\models\Category;
use yii\behaviors\TimestampBehavior;



/**
 * This is the model class for table "Gender".
 *
 * @property int $id
 * @property string $name Имя
 * @property string $status
 */
class Gender extends \yii\db\ActiveRecord
{

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'gender';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['product_id', 'gender'], 'required'],
            [['product_id', 'gender'], 'integer'],
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
