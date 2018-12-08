<?php

use yii\helpers\Html;
use yii\widgets\Breadcrumbs;

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>"/>
    <title><?= $this->title ?></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800&amp;subset=cyrillic-ext" rel="stylesheet">
	<meta name="description" content="Скидки на одежду в интернет магазинах, каталог скидок на одежду в интернет-магазинах">
	<!--!styles--><link href="/statics/styles.css" rel="stylesheet" type="text/css"><!--/styles-->
	<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter50161264 = new Ya.Metrika2({
                    id:50161264,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true,
                    trackHash:true
                });
            } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/tag.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks2");
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/50161264" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
    <?= Html::csrfMetaTags() ?>
    <?php $this->head() ?>
</head>
<body>
    <?php $this->beginBody() ?>
    <div id="app">

        <?= $this->render('_header'); ?>

        <div class="content">
            <?= $content ?>
        </div>

    </div>


    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script>
      !function (i,s,o,g,r,a,m) {
          if (typeof window[g] === "undefined") {
              var script = s.createElement("script");
              var node   = s.getElementsByTagName("script")[0];
              script.src = o;
              script.type = "text/javascript";
              node.parentNode.insertBefore(script, node);
          }
      }(window, document, "js/jquery.min.js", "jQuery");
    </script>
    <script type="text/javascript" src="/statics/libs.js"></script>
    <!--!scripts--><script type="text/javascript" src="/statics/main.js"></script><!--/scripts-->
    <script type="text/javascript" src="/statics/bundle.js"></script>
    <?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
