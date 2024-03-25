import { is_mobile } from './_functions.js';
document.addEventListener('DOMContentLoaded', () => {

    ymaps.ready(init);

    function init() {
        if ( ! $("#map").length ) {
            return;
        }

        const center = $('#map').attr('data-center').split(',');
        const coords = $('#map').attr('data-coords').split(',');
        const title = $("#map").attr('data-title-point');

        let myMap, myPlacemark;
        myMap = new ymaps.Map("map", {
            center: $(window).width() > 768 ? center : coords,
            zoom: 16,
            controls: ['zoomControl']
        }); 
        myMap.behaviors.disable('scrollZoom'); 
    
        myPlacemark = new ymaps.Placemark(coords, {
                hintContent: title,
                balloonContent: title
            },
            {
                iconLayout: 'default#image',
                // iconImageHref: 'img/icons/location.svg',
                // iconImageSize: [52, 75],
                // iconImageOffset: [-26, -75]
            }
        );
        
        myMap.geoObjects.add(myPlacemark);
    }
});