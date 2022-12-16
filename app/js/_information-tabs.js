import { is_mobile } from './_functions.js';

document.addEventListener('DOMContentLoaded', () => {
    $('#information_tabs li[data-for]').on('click', function() {
        const classActive = 'active';
        const selector = $(this).attr('data-for');

        if ( ! is_mobile() ) {
            $('#information_tabs li[data-for]').removeClass( classActive );
            $(`#information_tabs li[data-for="${selector}"]`).addClass( classActive );

            $('.js-information-block').removeClass( classActive );
            $(selector).addClass( classActive );
        } else {

            const classOpen = 'open';
            const select = $(this).closest('ul');
        
            if ( select.hasClass( classOpen ) ) {
                $('#information_tabs li[data-for]').removeClass( classActive );
                $(`#information_tabs li[data-for="${selector}"]`).addClass( classActive );

                $('.js-information-block').removeClass( classActive );
                $(selector).addClass( classActive );

                select.removeClass( classOpen );
            } else {
                select.addClass( classOpen );
            }
        }
    });
});