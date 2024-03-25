import { is_mobile, filter_matches } from "./_functions.js";

document.addEventListener("DOMContentLoaded", () => {
    $(".js-information-tournament li").on("click", function () {
        const selector = $(this).attr("data-for");

        const matchesPageFooter = $("#matches_page_footer");
        const matchesPagePagination = $("#matches_page_pagination");

        const classHidden = "hidden";
        const classPageFooterCenter = "page_footer-center";
        const classPageFooterJcsb = "page_footer-jcsb";

        if (selector == "#matches_tab") {
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

    const matchesSortButton = $("#matches_sort_button");
    matchesSortButton.on("click", function () {
        const matchesSortInput = $("#matches_sort_input");
        const sort = matchesSortInput.attr("value") == "asc" ? "desc" : "asc";
        matchesSortInput.attr("value", sort);

        filter_matches();

        if (sort == "desc") {
            matchesSortButton.addClass("button-sort--reverse");
        } else {
            matchesSortButton.removeClass("button-sort--reverse");
        }
    });

    $(".js-all-players").on("click", function () {
        $(".statistics_players--table").removeClass(
            "statistics_players--table"
        );
        $(this).remove();
    });

    //Выровняем столбцы в турнир таблицах

    $('li[data-for="#game_table"]').on("click", () => {
        const tablesSelector = "#game_table .js-tabs-block .game_table .table";
        const tables = $(tablesSelector);
        if (tables.length) {
            let widthValue = 0;
            const needRowSelector = "thead tr th:nth-child(2)";
            tables.each(function () {
                const needRow = $(this).find(needRowSelector);
                if (needRow.length && needRow.width() > widthValue) {
                    widthValue = needRow.width();
                }
            });

            $(`${tablesSelector} ${needRowSelector}`).width(widthValue);
        }
    });
});
