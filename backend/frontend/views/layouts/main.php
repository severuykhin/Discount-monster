<?php

use yii\helpers\Html;
use yii\widgets\Breadcrumbs;

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>"/>
    <title>Скидки на одежду в интернет магазинах - Betterdeals</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="Скидки на одежду в интернет магазинах, каталог скидок на одежду в интернет-магазинах">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/statics/styles/bootstrap4/bootstrap.min.css">
	<link href="/statics/plugins/fontawesome-free-5.0.1/css/fontawesome-all.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="/statics/styles/main_styles.css">
	<link rel="stylesheet" type="text/css" href="/statics/styles/cart_styles.css">
	<link rel="stylesheet" type="text/css" href="/statics/styles/cart_responsive.css">
	<link rel="stylesheet" type="text/css" href="/statics/styles/shop_styles.css">
    <meta name="yandex-verification" content="4e64a7bbc9d7be38" />
	<link rel="stylesheet" type="text/css" href="/statics/styles/responsive.css">
	<link rel="apple-touch-icon" sizes="180x180" href="/statics/images/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/statics/images/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/statics/images/favicon-16x16.png">
	<link rel="manifest" href="/statics/images/site.webmanifest">
	<link rel="mask-icon" href="/statics/images/safari-pinned-tab.svg" color="#5bbad5">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="theme-color" content="#ffffff">
	<!--!styles--><link href="/statics/main.86f944af.css" rel="stylesheet" type="text/css"><!--/styles-->
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
    <?= $content ?>
    <!--!scripts--><script type="text/javascript" src="/statics/main.1e091c8d.js"></script><!--/scripts-->
    <?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
