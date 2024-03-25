document.addEventListener("DOMContentLoaded", () => {
    const classActive = "active";

    $(".js-switcher li").on("click", function () {
        const selector = $(this).attr("data-for");
        const switcher = $(this).closest(".js-switcher");
        let switcherParentContainer;
        if (
            typeof switcher.attr("data-parent-container-selector") !==
                "undefined" &&
            switcher.attr("data-parent-container-selector") !== false
        ) {
            switcherParentContainer = switcher.closest(
                switcher.attr("data-parent-container-selector")
            );
        } else {
            switcherParentContainer = switcher.parent();
        }

        switcher.find("li").removeClass(classActive);
        $(this).addClass(classActive);

        switcherParentContainer
            .find(".js-switcher-block")
            .removeClass(classActive);
        $(selector).addClass(classActive);
    });
});
