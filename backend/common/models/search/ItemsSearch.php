<?php

namespace common\models\search;

use Yii;
use yii\base\Model;
use common\models\Item;
use common\models\Store;
use yii\helpers\VarDumper;

class ItemsSearch extends Model
{

	const PRICE_MIN = 'priceMin';
	const PRICE_MAX = 'priceMax';
	const MAX_DISCOUNT = 'discount';

	const LIMIT = 50;

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

	public function find(array $params): array
	{
		$query = Item::find();

		if (isset($params['slug'])) {
			$slug = $params['slug'];
			$store = Store::find()->where(['slug' => $slug])->asArray()->one();
			$query->where(['store_id' => $store['id']]);
			$minPrice = Item::find()->where(['store_id' => $store['id']])->min('price_sale');
			$maxPrice = Item::find()->where(['store_id' => $store['id']])->max('price_sale');
		} else {
			$minPrice = Item::find()->min('price_sale');
			$maxPrice = Item::find()->max('price_sale');
		}


		if (isset($params['page'])) {
			$query->offset(((int)$params['page'] - 1) * self::LIMIT);
		}

		if (isset($params['min'])) {
			$query->andFilterWhere(['>=', 'price_sale', $params['min']]);
		}

		if (isset($params['max'])) {
			$query->andFilterWhere(['<=', 'price_sale', $params['max']]);
		}	

		if (isset($params['gender'])) {
			$genders = explode(',', $params['gender']);
			$query->andFilterWhere(['in', 'gender', $genders]);
		}

		if (isset($params['sort'])) {
			$query->orderBy(self::sortTypes()[$params['sort']]);
		} else {
			$query->orderBy('price_sale');
		}

		
		$query->limit(50);

		return [
			'items' => $query->asArray()->all(),
			'count' => $query->count(),
			'minPrice' => $minPrice,
			'maxPrice' => $maxPrice
		];
	}
}