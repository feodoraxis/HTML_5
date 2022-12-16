document.addEventListener('DOMContentLoaded', () => {

    const classActive = 'active';

    $('.js-tabs li').on('click', function() {
    
        const selector = $(this).attr('data-for');
        const parent = $(this).closest('.js-tabs');

        parent.find('li').removeClass( classActive );
        $(this).addClass( classActive );

        $('.js-tabs-block').removeClass( classActive );
        $(selector).addClass( classActive );
    });
});