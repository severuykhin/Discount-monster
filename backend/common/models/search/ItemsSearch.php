<?php

namespace common\models\search;

use Yii;
use Yii\base\Model;
use common\models\Item;

class ItemsSearch extends Model
{
	public static function findBy(array $params): array 
	{
		$store_id = $params['id'];
		$step     = (int) $params['step'];
		$page     = (int) $params['page'];
		$sort     = $params['sort'];
		$offset   = $step * ($page - 1);

		$query = Item::find()->where(['store_id' => $store_id]);

		$query->offset($offset);
		$query->limit($step);

		return $query->asArray()->all();


	}
}