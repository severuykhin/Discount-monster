<?php 

use yii\helpers\Url;

?>
<div class="filters">
    <form data-role="catalog-search">


        <div class="filters__container">
        <input type="hidden" name="sort" <?= empty($model->sort) ? 'disabled' : '' ?> value="<?= $model->sort ?>" data-role="filters-sort">
        <div class="filters__block">
            <div class="filters__block-title">Цена:</div>
            <div class="filters__wrap">
            <div 
                class="range" 
                data-role="range" 
                data-minrange="<?= $model->minPrice ?>" 
                data-maxrange="<?= $model->maxPrice ?>" 
                data-step="10">

                <div class="range__line" data-role="range-line"></div>
                <div class="range__inputs">
                <div class="range__inputs-wrap">
                    <input 
                        name="minPrice" 
                        type="number" 
                        data-role="range-min-value" 
                        value="<?= $model->minPriceFilter ? $model->minPriceFilter : $model->minPrice ?>">
                </div><span class="range__inputs-divide">-</span>
                <div class="range__inputs-wrap">
                    <input 
                        name="maxPrice" 
                        type="number" 
                        data-role="range-max-value" 
                        value="<?= $model->maxPriceFilter ? $model->maxPriceFilter : $model->maxPrice ?>">
                </div>
                </div>
            </div>
            </div>
        </div>
        <?php if($catalogType === 'store'): ?>
            <div class="filters__block">
                <div class="filters__block-title">Категория:</div>
                <div class="filters__wrap">
                    <?php foreach($model->getCategories() as $key => $category): ?>
                        <div class="filters__item filters__item_checkbox">
                            <input 
                                id="category-<?= $category->id ?>" 
                                type="checkbox"
                                <?= in_array($category->id, $model->category) ? 'checked' : '' ?>
                                value="<?= $category->id ?>" 
                                name="category[]">
                            <label for="category-<?= $category->id ?>"><?= $category->name ?></label>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>

        <?php if($catalogType === 'category'): ?>
            <div class="filters__block">
                <div class="filters__block-title">Магазин:</div>
                <div class="filter__wrap">
                    <?php foreach($model->getStores() as $key => $store): ?>
                        <div class="filters__item filters__item_checkbox">
                            <input 
                                id="store-<?= $store->id ?>" 
                                type="checkbox"
                                <?= in_array($store->id, $model->store) ? 'checked' : '' ?>
                                value="<?= $store->id ?>" 
                                name="store[]">
                            <label for="store-<?= $store->id ?>"><?= $store->name ?></label>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
        <div class="filters__block">
            <div class="filters__block-title">Пол:</div>
            <div class="filter__wrap">
                <?php foreach($model->getGenders() as $key => $gender): ?>
                    <div class="filters__item filters__item_checkbox">
                        <input 
                            id="<?= $key ?>" 
                            type="checkbox"
                            <?= in_array($key, $model->gender) ? 'checked' : '' ?>
                            value="<?= $key ?>" 
                            name="gender[]">
                        <label for="<?= $key ?>"><?= $gender ?></label>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="filters__actions">
                <div class="filters__actions-row">
                    <button class="rcl--button rcl--button_accent" type="submit"> Подобрать</button>
                </div>
                <div class="filters__actions-row">
                    <?php if($model->isActive()): ?>
                        <a 
                            class="filters__cancel" href="<?= Url::canonical() ?>">
                            <span>Сбросить</span>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        </div>
    </form>
</div>