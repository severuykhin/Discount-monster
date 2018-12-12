<?php 

namespace common\models\search;

use Yii;
use yii\data\ActiveDataProvider;
use common\models\Product;
use common\models\bindings\ProductGender;
use yii\helpers\VarDumper;
use yii\helpers\ArrayHelper;
use common\models\Category;
use common\models\Store;
use yii\db\ActiveQuery;

class ProductSearch 
{
    public $minPrice;

    public $maxPrice;

    public $minPriceFilter;

    public $maxPriceFilter;

    public $category;

    public $store;

    public $gender;

    public $sort;

    public $color;

    public $size;

    public $discount;

    public function setValues(array $params): self
    {

        $this->maxPriceFilter = isset($params['maxPrice']) ? $params['maxPrice'] : null;
        $this->minPriceFilter = isset($params['minPrice']) ? $params['minPrice'] : null;
        $this->gender = isset($params['gender']) ? $params['gender'] : [];
        $this->sort = isset($params['sort']) ? $params['sort'] : '';
        $this->store = isset($params['store']) ? $params['store'] : [];
        $this->category = isset($params['category']) ? $params['category'] : [];

        return $this;
    }

    public function search($params, $baseCatalog = null): ActiveDataProvider 
    {   

        $this->setValues($params);

        $query = $this->findItems($params, $baseCatalog);

        $this->setPrices(clone $query);

        $query = $query->joinWith(['genders', 'category', 'store']);

        if (isset($this->minPriceFilter)) {
            $query->andFilterWhere(['>=', 'price_sale', $this->minPriceFilter]);
        }

        if (isset($this->maxPriceFilter)) {
            $query->andFilterWhere(['<=', 'price_sale', $this->maxPriceFilter]);
        }

        if (!empty($this->category)) {
            $query->andFilterWhere(['IN', Category::tableName() . '.id' , $this->category]);
        }

        if (!empty($this->store)) {
            $query->andFilterWhere(['IN', Store::tableName() . '.id' , $this->store]);
        }

        if (!empty($this->gender)) {
            $query->andFilterWhere(['IN', ProductGender::tableName() . '.gender' , $this->gender]);
        }

        if (isset($this->sort)) {
            if ($this->sort === 'price_asc') {
                $query->orderBy(['price_sale' => SORT_ASC]);
            }
            if ($this->sort === 'price_desc') {
                $query->orderBy(['price_sale' => SORT_DESC]);
            }
            if ($this->sort === 'discount_desc') {
                $query->orderBy(['discount' => SORT_DESC]);
            }
        }


        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => false,
            'pagination' => [
                'pageSize' => 30,
                'validatePage' => false,
                'forcePageParam' => false,
                'pageSizeParam' => false
            ],
        ]);

        return $dataProvider;
    }

    private function findItems(array $params, $baseCatalog = null): ActiveQuery
    {   
        if ($baseCatalog) {
            return $baseCatalog->getProducts();
        } else {
            return Product::find();
        }
    }


    private function setPrices(ActiveQuery $query): self
    {   
        $this->minPrice = $query->select('price_sale')->orderBy(['price_sale' => SORT_ASC])->scalar();
        $this->maxPrice = $query->select('price_sale')->orderBy(['price_sale' => SORT_DESC])->scalar();

        return $this;
    }

    public function isActive()
    {
        return $this->minPriceFilter ||
                $this->maxPriceFilter ||
                $this->category ||
                $this->store    ||
                $this->gender;
    }

    public function getCategories()
    {
        return Category::find()->where(['status' => Category::STATUS_ACTIVE])->all();
    }

    public function getStores()
    {
        return Store::find()->where(['status' => Store::STATUS_ACTIVE])->all();
    }

    public function getGenders()
    {
        return [
            '1' => 'Мужское',
            '2' => 'Жеснкое',
            '3' => 'Унисекс'
        ];
    }

    public function getGenderName($gender)
    {
        return $this->genders()[$gender];
    }

    private function sortTypes(): array
    {
        return [
            'price_asc'    => 'По цене по возрастанию',
            'price_desc'   => 'По цене по убыванию',
            'discount_desc' => 'Максимальная скидка',
            // 'popularity'   => 'По популярности',
        ];
    }

    public function getSortType($sort)
    {
        return $this->sortTypes()[$sort];
    }

    public function getSortTypes()
    {
        return $this->sortTypes();
    }
}