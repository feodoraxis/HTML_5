import { is_mobile, is_OSX } from "./_functions.js";

document.addEventListener("DOMContentLoaded", () => {
    const headerRightWidth = parseInt($("#header_right").width());
    const searchBlock = {
        classActive: "search_block-active",
        selector: $(".js-search_block:not(.search_block-static)"),
        doOpen: (currentButton) => {
            const element = currentButton.closest(".js-search_block");
            let width = headerRightWidth - 102;

            if (element.hasClass("search_block-fixed") && width > 553) {
                width = 553;
            }

            if (is_mobile()) {
                width = $(".page").width() - 32;
            }

            element.addClass(searchBlock.classActive);

            element
                .find(".search_block-input")
                .attr("data-width", element.width())
                .animate(
                    {
                        width: width,
                    },
                    300
                )
                .find("input")
                .focus();
        },
        doClose: () => {
            const element = $(".search_block-active");
            const input = element.find(".search_block-input");

            input.animate(
                {
                    width: input.attr("data-width"),
                },
                300
            );

            $("#search-result").removeClass("open", "open--fixed");

            setTimeout(() => {
                element.removeClass(searchBlock.classActive);
                input
                    .removeAttr("data-width")
                    .find("input")
                    .val("")
                    .attr("value", "");
            }, 300);
        },
        isActive: () => {
            return $(".search_block-active").length;
        },
    };

    searchBlock.selector.find("button").on("click", function (e) {
        if (searchBlock.isActive()) {
            return;
        }

        e.preventDefault();
        searchBlock.doOpen($(this));
    });

    $(document).mouseup(function (e) {
        if (
            !searchBlock.selector.is(e.target) &&
            searchBlock.selector.has(e.target).length === 0 &&
            searchBlock.isActive()
        ) {
            searchBlock.doClose();
        }
    });

    $(document).on("keyup", function (e) {
        if (e.key == "Escape" && searchBlock.isActive()) {
            searchBlock.doClose();
        }
    });

    $(".js-button-escape").on("click", function () {
        searchBlock.doClose();
    });
});
