import { is_mobile } from "./_functions.js";

document.addEventListener("DOMContentLoaded", () => {
    $("#information_tabs li[data-for]").on("click", function ({target}) {
        const classActive = "active";
        const currentSelector = target.getAttribute('data-for');

        if ($(`li[data-for="${currentSelector}"] ul`).length) {
            return;
        }

        if (
            !is_mobile() ||
            typeof $(".match_single") == "undefined" ||
            $(".match_single") === null
        ) {
            $("#information_tabs li[data-for]").removeClass(classActive);
            $(`#information_tabs li[data-for="${currentSelector}"]`).addClass(
                classActive
            );

            $(".js-information-block").removeClass(classActive);
            $(currentSelector).addClass(classActive);
        } else {
            const classOpen = "open";
            const select = $(this).closest("ul");

            if (select.hasClass(classOpen)) {
                $("#information_tabs li[data-for]").removeClass(classActive);
                $(`#information_tabs li[data-for="${currentSelector}"]`).addClass(
                    classActive
                );

                $(".js-information-block").removeClass(classActive);
                $(currentSelector).addClass(classActive);

                select.removeClass(classOpen);
            } else {
                select.addClass(classOpen);
            }
        }
    });
});
