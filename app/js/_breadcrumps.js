import { is_mobile } from './_functions.js' 

document.addEventListener('DOMContentLoaded', () => {

    if ( document.querySelector('.breadcrumps:not(.breadcrumps-lite)') == null ) {
        return;
    }

    const breadcrumps = document.querySelector('.breadcrumps');

    if ( breadcrumps.scrollWidth > breadcrumps.clientWidth ) {
        breadcrumps.classList.add('breadcrumps-overflow')
    }
});