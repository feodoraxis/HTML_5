document.addEventListener('DOMContentLoaded', () => {

    const classActive = 'active';

    $('.js-switcher li').on('click', function() {
    
        const selector = $(this).attr('data-for');
        const parent = $(this).closest('.js-switcher');

        parent.find('li').removeClass( classActive );
        $(this).addClass( classActive );

        $('.js-switcher-block').removeClass( classActive );
        $(selector).addClass( classActive );
    });
});