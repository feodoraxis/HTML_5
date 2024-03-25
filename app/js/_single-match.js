import {
    is_mobile,
    make_switcher_blocks,
    footer_switcher_toggle,
    table_fix_header_toggle,
} from "./_functions.js";

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".teams_single-team") == null) {
        return;
    }

    if (!is_mobile()) {
        let min = 1;
        $(".teams_single-team").each(function () {
            if (Math.ceil($(this).width()) > min) {
                min = Math.ceil($(this).width());
            }
        });

        $(".teams_single-team").width(min);
    }

    /**
     * Для мобилки
     */
    if (is_mobile()) {
        /**
         * Статистика игроков для мобилки
         */
        make_switcher_blocks("#statistics_left", "#statistics_right");

        footer_switcher_toggle("#statistics_players_footer_switcher", 775);
        $(window).on("scroll", () => {
            footer_switcher_toggle("#statistics_players_footer_switcher", 775);
        });

        table_fix_header_toggle("#statistics_left", 775);
        table_fix_header_toggle("#statistics_right", 775);
        $(window).on("scroll", () => {
            table_fix_header_toggle("#statistics_left", 775);
            table_fix_header_toggle("#statistics_right", 775);
        });

        $("#statistics_players_footer_switcher li").on("click", () => {
            setTimeout(() => {
                table_fix_header_toggle("#statistics_left", 775);
                table_fix_header_toggle("#statistics_right", 775);
            }, 1);
        });
    }

    //Автообновление данных по текущему матчу
    const matchSingle = $("#match_single");
    let doMatchRequest = false;
    let timeoutLive;

    if (typeof matchSingle !== "undefined" && matchSingle !== null) {
        const postId = parseInt(matchSingle.attr("data-post-id"));
        const matchStatus = matchSingle.attr("data-match-status");

        if (matchStatus == "do") {
            doMatchRequest = true;
            // setTimeout(function () {
            matchDataUpdate(postId);
            // }, 10000);
            getMatchDataClock();
        }

        function getMatchDataClock() {
            const now = new Date();
            const timeToNextTick =
                (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
            timeoutLive = setTimeout(function () {
                matchDataUpdate(postId);
                getMatchDataClock();
            }, timeToNextTick);
        }

        function matchDataUpdate(postId) {
            if (doMatchRequest === false) {
                cleatTimeout(timeoutLive);
                return false;
            }

            $.ajax({
                type: "POST",
                url: "/wp-admin/admin-ajax.php",
                data: {
                    action: "get_single_match_data",
                    form: {
                        post_id: postId,
                    },
                },
                success: function (data) {
                    if (data.success !== true) {
                        doMatchRequest = false;
                        if (
                            data.data.match_finish == true &&
                            $(".teams_single-is_on").length
                        ) {
                            $(".teams_single-is_on").remove();
                        }
                        return;
                    }

                    setMatchData(data.data.data);
                },
            });

            return false;
        }

        function setMatchData(data) {
            //Счёт
            if (
                typeof data?.score?.first_half?.masters !== "undefined" &&
                $("#first_half_masters").length
            ) {
                $("#first_half_masters").text(data.score.first_half.masters);
            }
            if (
                typeof data?.score?.first_half?.guests !== "undefined" &&
                $("#first_half_guests").length
            ) {
                $("#first_half_guests").text(data.score.first_half.guests);
            }

            if (
                typeof data?.score?.general?.masters !== "undefined" &&
                $("#general_half_masters").length
            ) {
                $("#general_half_masters").text(data.score.general.masters);
            }
            if (
                typeof data?.score?.general?.guests !== "undefined" &&
                $("#general_half_guests").length
            ) {
                $("#general_half_guests").text(data.score.general.guests);
            }

            //События в шапке
            if (
                typeof data?.actions !== "undefined" &&
                $("#match_result_header").length
            ) {
                $("#match_result_header").html(data.actions);
            }

            //Ход матча
            if (
                typeof data?.chronicle_html !== "undefined" &&
                $("#actions").length
            ) {
                $("#actions").html(data.chronicle_html);
            }

            //Состав
            if (
                typeof data?.consists_html !== "undefined" &&
                $("#consists").length
            ) {
                $("#consists").html(data.consists_html);
            }

            //Статистика игроков
            if (
                typeof data?.players_statistics_html !== "undefined" &&
                $("#players_statistics").length
            ) {
                $("#players_statistics").html(data.players_statistics_html);
            }

            //Статистика команд
            if (
                typeof data?.teams_statistics_html !== "undefined" &&
                $("#teams_statistics").length
            ) {
                $("#teams_statistics").html(data.teams_statistics_html);
            }
        }
    }
});
