import { is_mobile } from './_functions.js';
import { tns } from 'tiny-slider';

document.addEventListener('DOMContentLoaded', () => {

    const sliderControl = '<svg class="icon icon-angle-bottom "><use xlink:href="/wp-content/themes/rugby/assets/img/sprite.svg#angle-bottom"></use></svg>';

    const personSliderID = 'person_slider';
    const personSliderHTML = document.getElementById(personSliderID);
    if ( typeof personSliderHTML == 'undefined' || personSliderHTML == null ) {
        return;
    }

    const args = {
        container: `#${personSliderID}`,
        // items: 10,
        // slideBy: 'page',
        // gutter: 12,
        // edgePadding: 12,
        nav: false,
        loop: false,
        // mouseDrag: true,
        controlsText: [sliderControl, sliderControl],
        items: 1,
    };
    tns(args);
});