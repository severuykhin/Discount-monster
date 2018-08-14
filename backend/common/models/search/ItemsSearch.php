<?php

namespace common\models\search;

use Yii;
use Yii\base\Model;
use common\models\Item;

class ItemsSearch extends Model
{

	const PRICE_MIN = 'filter_min';
	const PRICE_MAX = 'filter_max';
	const MAX_DISCOUNT = 'filter_discount';

	protected static function sortTypes(): array
	{
		return [
			self::PRICE_MIN    => ['price_sale' => SORT_ASC],
			self::PRICE_MAX    => ['price_sale' => SORT_DESC],
			self::MAX_DISCOUNT => ['ABS (price - price_sale)' => SORT_DESC]
		];
	}

	public static function findBy(array $params): array 
	{
		$store_id = $params['id'];
		$step     = (int) $params['step'];
		$page     = (int) $params['page'];
		$sort     = $params['sort'];
		$offset   = $step * ($page - 1);

		$query = Item::find()->where(['store_id' => $store_id]);

		if (!empty($sort)) {
			$query->orderBy(self::sortTypes()[$sort]);
		}

		
		$query->offset($offset);
		$query->limit($step);

		return $query->asArray()->all();


	}
}