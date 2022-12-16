import { is_mobile } from './_functions.js';
document.addEventListener('DOMContentLoaded', () => {

    $("#wc_open_description").on('click', function() {
        $(this)
            .addClass('open')
            .parent()
            .addClass('open');
    });
});