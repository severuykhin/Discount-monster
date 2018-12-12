<?php 

use yii\helpers\Url;
use frontend\components\Pager;


$h1 = '';
$description = '';

if ($catalogType === 'store') {
  $h1 = 'Скидки на одежду в магазине ' . $baseEntity->name;
} else if ($catalogType === 'category') {
  $h1 = 'Скидки на ' . $baseEntity->name . ' в интернет магазинах';
} else {
  $h1 = 'Скидки на одежду и обувь в интернет магазинах <br> популярных брендов';
}

$this->title = $h1;

$this->registerMetaTag([
  'name' => 'description',
  'content' => $description
]);

$this->registerLinkTag(['rel' => 'canonical', 'href' => Url::canonical()]);

?>


<ul class="breadcrumbs">
    <li class="breadcrumbs__item">
        <a class="breadcrumbs__link" href="<?= Url::to(['site/index']); ?>">Главная</a>
    </li>
    <li class="breadcrumbs__item">
        <?php if($catalogType === 'all'): ?>
          <span class="breadcrumbs__link">Каталог</span>
        <?php else: ?>
          <a class="breadcrumbs__link" href="<?= Url::to(['catalog/index']); ?>">Каталог</a>
        <?php endif; ?>
    </li>
    <!-- <?php if($catalogType === 'store'): ?>
        <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="#">Магазины</a>
        </li>
    <?php elseif($catalogType === 'category'): ?>
        <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="#">Категории</a>
        </li>
    <?php endif; ?> -->
    <?php if($baseEntity): ?>
      <li class="breadcrumbs__item">
          <span class="breadcrumbs__link breadcrumbs__link_active" href="#">
            <?= $baseEntity->name ?>
          </span>
      </li>
    <?php endif; ?>
</ul>

<div class="catalog">
          <div class="catalog__header">
            <div class="catalog__header-item">
              <h1 class="title title_h1"><?= $h1 ?></h1>
            </div>
            <div class="catalog__header-item">
              <div class="catalog__sort"><span><b>Сортировать:</b></span>
                <select data-role="sort-select" value="">
                  <option selected disabled>По умолчанию</option>
                  <?php foreach($searchModel->getSortTypes() as $key => $type): ?>
                    <option
                      <?= $searchModel->sort == $key ? 'selected' : '' ?> 
                      value="<?= $key ?>">
                      <?= $type ?>
                    </option>
                  <?php endforeach; ?>
                </select>
              </div>
            </div>
          </div>
          <div class="catalog__content">
            
            <div class="catalog__filters">
              <?= $this->render('_form', [
                  'catalogType' => $catalogType,
                  'model' => $searchModel
              ]) ?>
            </div>

            <div class="catalog__items">

              <?= $this->render('_grid', [
                'models' => $dataProvider->getModels()
              ]) ?>


              <div class="catalog__pagination">
                <?= Pager::widget([
                    'pagination' => $dataProvider->pagination,
                    'maxButtonCount' => 10,
                    'nextPageLabel' => '',
                    'prevPageLabel' => '',
                    'firstPageLabel' => '',
                    'lastPageLabel' => '',
                    'hideOnSinglePage' => true,
                    'registerLinkTags' => true,
                    'pageCssClass' => 'pagination__item',
                    'firstPageCssClass' => 'pagination__next',
                    'lastPageCssClass' => 'pagination__prev',
                    'prevPageCssClass' => 'pagination__prev',
                    'nextPageCssClass' => 'pagination__next',
                    'activePageCssClass' => 'pagination__item_active',
                    'disabledPageCssClass' => 'pagination-disable',
                ]); ?>

              </div>
            </div>
          </div>
        </div>