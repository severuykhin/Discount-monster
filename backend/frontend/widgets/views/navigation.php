<?php

use yii\helpers\Html;

?>

<div class="rcl--navbar__list">
        <div class="rcl--navbar__list-wrap">
        <div class="rcl--navbar__list-row">
            <div class="rcl--navbar__list-title">Магазины</div>
                <ul class="rcl--navbar__list-items">
                    <?php foreach($stores as $store): ?>
                        <li class="rcl--navbar__list-item">
                            <?= Html::a($store->name, ['catalog/store', 'slug' => $store->slug], ['class' => 'rcl--navbar__list-link']); ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
        </div>
        <div class="rcl--navbar__list-row">
            <div class="rcl--navbar__list-title">Категории</div>
            <ul class="rcl--navbar__list-items">
                <?php foreach($categories as $category): ?>
                    <li class="rcl--navbar__list-item">
                        <?= Html::a($category->name, ['catalog/category', 'slug' => $category->slug], ['class' => 'rcl--navbar__list-link']); ?>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
        </div>
    </div>