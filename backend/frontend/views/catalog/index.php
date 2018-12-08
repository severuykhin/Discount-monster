<?php 

use yii\helpers\Url;


$h1 = '';
$description = '';

if ($catalogType === 'store') {
  $h1 = 'Скидки на одежду в магазине ' . $baseEntity->name;
} else if ($catalogType === 'category') {
  $h1 = 'Скидки на ' . $baseEntity->name . ' в интернет магазинах';
} else {
  $h1 = 'Скидки на одежду и обувь в интернет магазинах популярных брендов';
}

$this->title = $h1;

$this->registerMetaTag([
  'name' => 'description',
  'content' => $description
]);

?>


<ul class="breadcrumbs">
    <li class="breadcrumbs__item">
        <a class="breadcrumbs__link" href="<?= Url::to(['site/index']); ?>">Главная</a>
    </li>
    <li class="breadcrumbs__item">
        <a class="breadcrumbs__link" href="<?= Url::to(['catalog/index']); ?>">Каталог</a>
    </li>
    <?php if($catalogType === 'store'): ?>
        <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="#">Магазины</a>
        </li>
    <?php elseif($catalogType === 'category'): ?>
        <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="#">Категории</a>
        </li>
    <?php endif; ?>
    <li class="breadcrumbs__item">
        <span class="breadcrumbs__link breadcrumbs__link_active" href="#">
          <?= $baseEntity->name ?>
        </span>
    </li>
</ul>

<div class="catalog">
          <div class="catalog__header">
            <div class="catalog__header-item">
              <h1 class="title title_h1"><?= $h1 ?></h1>
            </div>
            <div class="catalog__header-item">
              <div class="catalog__sort"><span>Сортировать:</span>
                <select data-role="sort-select">
                  <option>option 1</option>
                  <option>option 2</option>
                  <option>option 3</option>
                  <option>option 4</option>
                </select>
              </div>
            </div>
          </div>
          <div class="catalog__content">
            <div class="catalog__filters">
              <?= $this->render('_form', [
                  'catalogType' => $catalogType
              ]) ?>
            </div>
            <div class="catalog__items">

              <?= $this->render('_grid', [
                'models' => $dataProvider->getModels()
              ]) ?>


              <div class="catalog__pagination">
                <ul class="pagination">
                  <li class="pagination__item"><a href="">1</a></li>
                  <li class="pagination__item pagination__item_active"><span>2</span></li>
                  <li class="pagination__item"><a href="">3</a></li>
                  <li class="pagination__item"><a href="">...</a></li>
                  <li class="pagination__item"><a href="">4</a></li>
                  <li class="pagination__item"><a href="">5</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>