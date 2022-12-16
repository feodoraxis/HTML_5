import { is_mobile } from './_functions.js' 

document.addEventListener('DOMContentLoaded', () => {
    // $('[data-for="#matches_tab"]').on("click", function() {
    $(".js-information-tournament li").on('click', function() {
        const selector = $(this).attr('data-for');

        const matchesPageFooter = $('#matches_page_footer');
        const matchesPagePagination = $('#matches_page_pagination');

        const classHidden = 'hidden';
        const classPageFooterCenter = 'page_footer-center';
        const classPageFooterJcsb = 'page_footer-jcsb';

        if ( selector == '#matches_tab' ) {
            matchesPageFooter
                .addClass(classPageFooterJcsb)
                .removeClass(classPageFooterCenter);

            matchesPagePagination.removeClass(classHidden);
        } else {
            matchesPageFooter
                .removeClass(classPageFooterJcsb)
                .addClass(classPageFooterCenter);

            matchesPagePagination.addClass(classHidden);
        }
    });
});