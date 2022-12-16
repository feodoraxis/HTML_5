import { MapRegions } from './_functions.js';


document.addEventListener('DOMContentLoaded', function(){
   
    if ( typeof $('#regions_map') == 'undefined' ) {
        return;
    }

    const classActive = 'active';
    const container = $('#column_data_container');
    const regions = JSON.parse($('#regions_map').attr('data-regions'));

    $('#regions_map g > path').on({
        mouseenter: function(e) {
            let title = $(this).attr('data-name');

            if ( typeof title == 'undefined' ) {
                title = $(this).parent().attr('data-name');
            }


            container
                .html( `<p>${title}</p>` )
                .addClass( classActive )
                .css({
                    top: $(this).offset().top - container.height() - 24,
                    left: $(this).offset().left + 24,
                });
        },
        mouseleave: function() {
            container.removeClass( classActive );
        }
    });

    new MapRegions({ items: regions }).init();
})
