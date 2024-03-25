import { is_mobile, reverseArr } from "./_functions.js";

export const mainMenuContainerManagement = (
    menuMain,
    containerForMoreSelector
) => {
    let itemsInMore = [];

    let itemsWidthSumm = 0;

    menuMain.find("li").each(function (key, object) {
        itemsWidthSumm += $(this).width();
    });

    if (menuMain.width() - 30 < parseInt(itemsWidthSumm)) {
        let removeNext = true;
        $(menuMain.find("li").get().reverse()).each(function (key, object) {
            if (removeNext === true) {
                itemsInMore.push(object);
                $(this).detach();

                itemsWidthSumm = 0;
                menuMain.find("li").each(function () {
                    itemsWidthSumm += $(this).width();
                });

                if (menuMain.width() - 82 > itemsWidthSumm) {
                    removeNext = false;
                }
            }
        });

        const moreMenusButton = menuMain.find(
            ".js-menu-item-object-custom--more"
        );

        if (
            typeof moreMenusButton !== "undefined" &&
            moreMenusButton !== null
        ) {
            moreMenusButton.remove();
        }

        menuMain
            .find("nav:not(.menu_main--help-section) ul")
            .append(
                $(
                    '<li class="menu-item menu-item-type-custom menu-item-object-custom js-menu-item-object-custom--more "><a href="#"><div><span>Ещё</span><svg class="icon icon-angle-bottom"><use xlink:href="https://rugby.ru/wp-content/themes/rugby/assets/img/sprite.svg#angle-bottom"></use></svg></div></a></li>'
                )
            );

        if ($(containerForMoreSelector) !== null && itemsInMore.length !== 0) {
            itemsInMore.map(function (object) {
                $(containerForMoreSelector).append(object);
            });
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // window.addEventListener("load", () => {
    const classChildMenuActive = "active";

    $("[data-child-menu]").on("mouseover", function () {
        if (is_mobile()) {
            return;
        }

        const childMenu = $($(this).attr("data-child-menu"));

        if (childMenu.hasClass(classChildMenuActive)) {
            return;
        }

        if (childMenu.hasClass("js-menu_main-submenu--lite")) {
            childMenu.css({
                left: $(this).offset().left,
            });
        }

        $(".js-menu_main-submenu").removeClass(classChildMenuActive);
        childMenu.addClass(classChildMenuActive);
    });

    $("[data-child-menu], .js-menu_main-submenu").on("mouseleave", () => {
        if (is_mobile()) {
            return;
        }

        if (
            $("[data-child-menu]:hover").length === 0 &&
            $(".js-menu_main-submenu:hover").length === 0
        ) {
            $(`.js-menu_main-submenu.${classChildMenuActive}`).removeClass(
                classChildMenuActive
            );
        }
    });

    mainMenuContainerManagement($("#menu_main"), "#menu_main_child_items");

    $(document).on(
        "mouseover",
        ".js-menu-item-object-custom--more",
        function () {
            $(this).find("a").addClass("hover");
            $(this)
                .closest(".menu_main")
                .find(".menu_main--help-section")
                .addClass("open")
                .css({
                    width: $(this).position().left,
                });
        }
    );

    $(document).on(
        "mouseleave",
        ".js-menu-item-object-custom--more, .menu_main--help-section",
        function () {
            if (
                $(".js-menu-item-object-custom--more:hover").length === 0 &&
                $(".menu_main--help-section:hover").length === 0
            ) {
                $(`.menu_main--help-section.open`).removeClass("open");
                $(".js-menu-item-object-custom--more")
                    .find("a")
                    .removeClass("hover");
            }
        }
    );
});
