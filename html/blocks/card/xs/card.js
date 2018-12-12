$(function () {

    $(document).on('click', '[data-role="card-like-product"]', function(e) {
        e.preventDefault();
        e.stopPropagation();

        let self = $(this),
            id = self.attr('data-id'),
            isPlus = self.hasClass('active');

        let action = {
            type: isPlus ? 'favorite/ADD' : 'favorite/DELETE',
            payload: id
        };

        self.toggleClass('active');
        
        // Connect to react favorites widget
        window.store.dispatch(action);
    });


});