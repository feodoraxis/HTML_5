import { is_mobile, make_switcher_blocks, footer_switcher_toggle, table_fix_header_toggle } from './_functions.js';

document.addEventListener('DOMContentLoaded', () => {
    if ( document.querySelector('.teams_single-team') == null ) {
        return;
    }

    if ( ! is_mobile() ) {
        let min = 1;
        $('.teams_single-team').each(function() {
            if ( Math.ceil( $(this).width() ) > min ) {
                min = Math.ceil( $(this).width() );
            }
        });

        $('.teams_single-team').width( min );
    }

    /**
     * Для мобилки
     */
    if ( is_mobile() ) {

        /**
         * Статистика игроков для мобилки
         */
        make_switcher_blocks( '#statistics_left', '#statistics_right' );

        footer_switcher_toggle( '#statistics_players_footer_switcher', 775 );
        $(window).on('scroll', () => {
            footer_switcher_toggle( '#statistics_players_footer_switcher', 775 );
        });

        table_fix_header_toggle( '#statistics_left', 775 );
        table_fix_header_toggle( '#statistics_right', 775 );
        $(window).on('scroll', () => {
            table_fix_header_toggle( '#statistics_left', 775 );
            table_fix_header_toggle( '#statistics_right', 775 );
        });

        $('#statistics_players_footer_switcher li').on('click', () => {
            setTimeout(() => {
                table_fix_header_toggle( '#statistics_left', 775 );
                table_fix_header_toggle( '#statistics_right', 775 );
            }, 1);
        });
    }
});