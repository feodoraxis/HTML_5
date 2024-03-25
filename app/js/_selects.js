import { filter_matches } from "./_functions.js";
import selectize from "@selectize/selectize";

document.addEventListener("DOMContentLoaded", () => {
    $("select").selectize({
        onInitialize: function () {
            if (
                $(this)[0].$control.find(".item").attr("data-value") ==
                    "none" ||
                $(this)[0].$control.find(".item").attr("data-value") == "#all"
            ) {
                $(this)[0].$control.addClass("none");
            }
        },
        onChange: function (value, isOnInitialize) {
            const option = $('option[value="' + value + '"]');
            if (
                typeof option.closest(".js-links-select") != "undefined" &&
                option.closest(".js-links-select") != null &&
                option.closest(".js-links-select").length
            ) {
                document.location = value;
            }

            if (option.parent().attr("id") == "search-orderby") {
                let orderby = "rel",
                    link = window.location.href;

                if (value == "title") {
                    orderby = "title";
                }

                if (link.indexOf("&orderby") === -1) {
                    window.location.href += "&orderby=" + orderby;
                } else {
                    window.location.href =
                        link.substr(0, link.indexOf("&orderby")) +
                        "&orderby=" +
                        orderby;
                }
            }

            if (option.parent().attr("id") == "filter_seasons_tournament") {
                if (
                    option.parent().attr("name") == "filter[tournament]" &&
                    value !== "none"
                ) {
                    filter_matches(true);
                } else {
                    filter_matches();
                }
            }

            if (option.parent().attr("id") == "choice_tournament_select") {
                $("#choice_tournament").submit();
            }

            if (
                option.parent().attr("class").indexOf("s-tabs-like-select") > -1
            ) {
                const selector = value;

                if (
                    typeof option
                        .parent()
                        .attr("data-tabs-container-selector") !== "undefined" &&
                    option.parent().attr("data-tabs-container-selector") !==
                        null &&
                    option
                        .parent()
                        .attr("data-tabs-container-selector")
                        .trim() !== ""
                ) {
                    const parentContainer = $(
                        option.parent().attr("data-tabs-container-selector")
                    );
                    parentContainer
                        .find(".js-tabs-block")
                        .removeClass("active");
                    parentContainer.find(selector).addClass("active");
                } else {
                    $(".js-tabs-block").removeClass("active");
                    $(selector).addClass("active");
                }
            }

            if (value == "none" || value == "#all") {
                option
                    .parent()
                    .parent()
                    .find(".selectize-input.full")
                    .addClass("none");
            } else {
                option
                    .parent()
                    .parent()
                    .find(".selectize-input.full")
                    .removeClass("none");
            }
        },
        onDropdownOpen: function (e) {
            const dropdownTop = parseInt(e.css("top")) + 10;
            e.css("top", dropdownTop);
        },
    });
});
