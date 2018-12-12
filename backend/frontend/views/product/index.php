<?php

$h1 = $model->name;
$description = $model->name . ' - купить со скидкой в магазине ' . $model->store->name;

$this->title = $h1;

$this->registerMetaTag([
  'name' => 'description',
  'content' => $description
]);

var_dump($model);