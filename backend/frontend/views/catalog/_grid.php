<?php ?>


<ul class="catalog__grid">
    <?php foreach($models as $model): ?>
        <?= $this->render('../product/_preview', [
            'model' => $model
        ]); ?>
    <?php endforeach; ?>
</ul>