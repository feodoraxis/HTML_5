document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('scroll', function() {
        const classActive = 'active';
        const classMenuMainSubmenuFixed = 'menu_main-submenu-fixed';

        const headerFixed = document.getElementById("header_fixed");
        const menuMainSubmenus = document.getElementsByClassName('js-menu_main-submenu');

        if ( pageYOffset > 100 && !headerFixed.classList.contains( classActive ) ) {
            headerFixed.classList.add( classActive );

            Array.prototype.forEach.call( menuMainSubmenus, ( currentSubmenu ) => {
                currentSubmenu.classList.add( classMenuMainSubmenuFixed );
            } );
        }

        if ( pageYOffset < 100 && headerFixed.classList.contains( classActive ) ) {
            headerFixed.classList.remove( classActive );

            Array.prototype.forEach.call( menuMainSubmenus, ( currentSubmenu ) => {
                currentSubmenu.classList.remove( classMenuMainSubmenuFixed );
            } );
        }
    });
});