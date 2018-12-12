<?php

use frontend\widgets\Navigation;
use yii\helpers\Url;

?>

<header>
    <div class="rcl--header rcl--header_main">
        <div class="rcl--header__section">
        <div class="rcl--header__item"><a href="/">LOGO</a></div>
        <div class="rcl--header__item"><a class="rcl--button_link" href="/alala">Button link</a></div>
        </div>
        <div class="rcl--header__section">
        <div class="rcl--header__item"><a class="rcl--button_link" href="/alala">Button link</a></div>
        </div>
    </div>
</header>
<nav class="rcl--navbar">
    <div class="rcl--navbar__row">
        <div class="rcl--navbar__item">
        <a href="<?= Url::to(['/catalog']); ?>" data-role="open-nav" class="rcl--navbar__button rcl--button"><span>Каталог</span></a>
        </div>
        <div class="rcl--navbar__item rcl--visible-md-down">
        <button class="rcl--button rcl--button_icon rcl--button_search">
            <svg x="0px" y="0px" viewbox="0 0 56.966 56.966">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23                                s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92                                c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17                                s-17-7.626-17-17S14.61,6,23.984,6z"></path>
            </svg>
        </button>
        </div>
        <div class="rcl--navbar__item"><a class="rcl--navbar__link" href="/best">&Lcy;&ucy;&chcy;&shcy;&iecy;&iecy;</a></div>
        <div class="rcl--navbar__item">
        <div id="searchbar-widget"></div>
        </div>
    </div>
    <div class="rcl--navbar__row">
        <div class="rcl--navbar__item">
        <div id="favorite-widget"></div>
        </div>
    </div>
    <?= Navigation::widget(); ?>
</nav>