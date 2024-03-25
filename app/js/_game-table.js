import { is_mobile } from './_functions.js';
document.addEventListener('DOMContentLoaded', () => {

    if ( ! is_mobile() || typeof $('.game_table-table') == 'undefined' ) {
        return;
    }

    const correctionTable = () => {
        setTimeout(() => {
            $('.game_table-table .team_card').each(function() {
            
                let min_width = $(this).find('img').width() + $(this).find('p').width() + 16 + 24;
    
                $(this).closest('td').css({
                    'min-width': min_width
                });
            });
        }, 100);
        
    };

    correctionTable();
    $('#information li').on('click', correctionTable);

    $('.game_table-table').on('scroll', function() {
        if ( $(this).scrollLeft() > 200 ) {
            $(this).parent().find('.game_table-left').addClass('active');
        } else {
            $(this).parent().find('.game_table-left').removeClass('active');
        }
    });
    
});