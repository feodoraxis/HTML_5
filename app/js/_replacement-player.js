import { is_mobile } from './_functions.js';

document.addEventListener('DOMContentLoaded', () => {

    if ( !$('#column_data_container').length ) {
        return;
    }

    const classActive = 'active';
    const container = $('#column_data_container');

    $('.js-column_data-source').on({
        mouseenter: function(e) {

            const data = JSON.parse($(this).attr('data-content'));
            const html = data.reduce((acc, currentElement) => {
                if ( typeof currentElement.title != 'undefined' ) {
                    return acc + `<p><span>${currentElement.title}</span> ${currentElement.content}</p>`;
                } else {
                    return acc + `<p>${currentElement.content}</p>`;
                }
            }, '');

            container
                .html( html )
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
});