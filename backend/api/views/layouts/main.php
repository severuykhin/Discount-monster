<?php

use backend\assets\AppAsset;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use yii\bootstrap\Alert;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">
    <script defer src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&amp;subset=cyrillic" rel="stylesheet">
	<!--!styles--><link href="/backend/assets/main.906db9a2.css" rel="stylesheet" type="text/css"><!--/styles-->    
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
    <?php $this->beginBody() ?>
    <div class="section">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <?php
                    echo Breadcrumbs::widget([
                        'homeLink' => [
                            'label' => 'Мои виджеты',
                            'url' => ['/site/index']
                        ],
                        'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
                    ]);
                    $flashes = Yii::$app->session->allFlashes;
                    foreach ($flashes as $type => $flash) {
                        echo Alert::widget([
                            'options' => [
                                'class' => 'alert-' . $type,
                            ],
                            'body' => $flash
                        ]);
                    }
                    ?>
                    <?= $content ?>
                </div>
            </div>
        </div>
    </div>
    <?php $this->endBody() ?>
    <!--!scripts--><script type="text/javascript" src="/backend/assets/main.a0d1a532.js"></script><!--/scripts-->
</body>
</html>
<?php $this->endPage() ?>
