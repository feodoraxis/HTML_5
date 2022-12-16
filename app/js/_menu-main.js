import { is_mobile } from './_functions.js' 

document.addEventListener('DOMContentLoaded', () => {

    const classChildMenuActive = 'active';

    $('[data-child-menu]').on('mouseover', function() {
        if ( is_mobile() ) {
            return;
        }

        const childMenu = $($(this).attr('data-child-menu'));
    
        if ( childMenu.hasClass( classChildMenuActive ) ) {
            return;
        } 

        $('.js-menu_main-submenu').removeClass( classChildMenuActive );
        childMenu.addClass( classChildMenuActive );
    });

    $('[data-child-menu], .js-menu_main-submenu').on('mouseleave', () => {
        if ( is_mobile() ) {
            return;
        }
        
        if ( $('[data-child-menu]:hover').length === 0 && $('.js-menu_main-submenu:hover').length === 0 ) {
            $(`.js-menu_main-submenu.${classChildMenuActive}`).removeClass( classChildMenuActive );
        }
    });
});