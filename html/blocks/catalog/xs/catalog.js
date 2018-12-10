$(function () {

let menuTimer = null;

$('[data-role="open-nav"]').on('mouseenter', function () {
    $('.rcl--navbar__list').addClass('active');
    clearInterval(menuTimer);
    menuTimer = setTimeout(() => {
        $('.rcl--navbar__list').removeClass('active');        
    }, 2000);
});

$('.rcl--navbar__list').on('mouseenter', function () {
    clearTimeout(menuTimer);
    menuTimer = null;
});

$('.rcl--navbar__list').on('mouseleave', function (e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    $(this).removeClass('active');

    // menuTimer = setTimeout(() => {
    // }, 1000);
});


});