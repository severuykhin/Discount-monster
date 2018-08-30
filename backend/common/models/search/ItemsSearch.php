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
	const POPULAR = 'popular';

	const LIMIT = 45;

	protected static function sortTypes(): array
	{
		return [
			self::PRICE_MIN    => ['price_sale' => SORT_ASC],
			self::PRICE_MAX    => ['price_sale' => SORT_DESC],
			self::POPULAR      => ['like' => SORT_DESC],
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
		// http://www.asos.com/ru/women/autlet/cat/?cid=27391&currentpricerange=90-23390&nlid=ww|%D0%B0%D1%83%D1%82%D0%BB%D0%B5%D1%82|%D1%81%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BF%D0%BE%20%D1%82%D0%B8%D0%BF%D1%83%20%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%B0&refine=attribute_900:3961,1632,1631,1497,1494,1562|brand:17,18,15565,12136,13688,15673,2943,3735,2950,15139,15626,396,14489,15171,401,15127,499,2986,15176,13623,15177,3115,14096,3594,14126,589,2988,12983,12512,712,3312,3029,15355,755,765
		
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

		
		$query->limit(45);

		return [
			'items' => $query->asArray()->all(),
			'count' => $query->count(),
			'minPrice' => $minPrice,
			'maxPrice' => $maxPrice
		];
	}
}