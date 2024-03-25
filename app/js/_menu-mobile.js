import {
    is_mobile,
    before_modal_open,
    after_modal_close,
} from "./_functions.js";

document.addEventListener("DOMContentLoaded", () => {
    const classActive = "active";
    const classHamburgerActive = "hamburger-active";
    const classHeaderMenuMobileIsOpen = "header-menu_mobile_is_open";

    const header = document.getElementById("header");
    const hamburger = document.getElementById("hamburger");
    const headerMenuMobile = document.getElementById("menu_mobile");

    const menuMobileOpen = () => {
        before_modal_open();
        header.classList.add(classHeaderMenuMobileIsOpen);
        hamburger.classList.add(classHamburgerActive);
        headerMenuMobile.classList.add(classActive);
    };
    const menuMobileClose = () => {
        header.classList.remove(classHeaderMenuMobileIsOpen);
        hamburger.classList.remove(classHamburgerActive);
        headerMenuMobile.classList.remove(classActive);
        $("#search-result").removeClass("open", "open--fixed");
        after_modal_close();
    };

    hamburger.onclick = (e) => {
        if (!headerMenuMobile.classList.contains(classActive)) {
            menuMobileOpen();
        } else {
            menuMobileClose();
        }
    };

    document.onkeydown = (e) => {
        e = e || window.event;

        let isEscape = false;
        if ("key" in e) {
            isEscape = e.key === "Escape" || e.key === "Esc";
        } else {
            isEscape = e.keyCode === 27;
        }

        if (isEscape) {
            menuMobileClose();
        }
    };

    const menuMobileBody = document.getElementById("menu_mobile_body");
    const mobileSubmenus = document.querySelectorAll("[data-child-menu]");
    const menuMobileMain = document.getElementById("menu_mobile_main");

    const classIsSubmenuOpen = "is-submenu-open";
    const classOpen = "open";

    for (let i = 0; i < mobileSubmenus.length; i++) {
        mobileSubmenus[i].addEventListener("click", (e) => {
            if (is_mobile()) {
                e.preventDefault();
            }
            const submenuId = mobileSubmenus[i].getAttribute("data-child-menu");

            menuMobileBody.classList.add(classIsSubmenuOpen);
            menuMobileMain.classList.add(classIsSubmenuOpen);
            document
                .querySelector(`[data-id="${submenuId}"]`)
                .classList.add(classOpen);
        });
    }

    const mobileSubmenusTitles = document.querySelectorAll(
        ".menu_mobile-submenu h4"
    );
    for (let i = 0; i < mobileSubmenusTitles.length; i++) {
        mobileSubmenusTitles[i].addEventListener("click", () => {
            menuMobileBody.classList.remove(classIsSubmenuOpen);
            menuMobileMain.classList.remove(classIsSubmenuOpen);
            document.querySelector(`.${classOpen}`).classList.remove(classOpen);
        });
    }
});
