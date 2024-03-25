import { is_mobile } from "./_functions.js";

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("front_toggle") == null) {
        return;
    }

    // Мобильное переключение секций на главной
    const frontTabSelectedKey = "front_tab_selected";
    const classFrontToggleSectionActive = "front_toggle-section_active";
    const classFrontToggleActive = "front_toggle-active";

    const toggleButtons = document.querySelectorAll(
        "#front_toggle li[data-for]"
    );
    const toggleSections = document.querySelectorAll(
        ".js-front_toggle-section"
    );
    for (let i = 0; i < toggleButtons.length; i++) {
        toggleButtons[i].addEventListener("click", () => {
            // Sections
            for (let j = 0; j < toggleSections.length; j++) {
                toggleSections[j].classList.remove(
                    classFrontToggleSectionActive
                );
            }

            const sectionToOpen = toggleButtons[i].getAttribute("data-for");
            document
                .querySelector(sectionToOpen)
                .classList.add(classFrontToggleSectionActive);

            //Buttons
            for (let j = 0; j < toggleButtons.length; j++) {
                toggleButtons[j].classList.remove(classFrontToggleActive);
            }
            toggleButtons[i].classList.add(classFrontToggleActive);

            let date = new Date(Date.now() + 24 * 3600 * 1000 * 300);
            date = date.toUTCString();

            document.cookie =
                `${frontTabSelectedKey}=${sectionToOpen}; path=/; expires=` +
                date;

            console.log(
                `${frontTabSelectedKey}=${sectionToOpen}; path=/; expires=` +
                    date
            );

            // localStorage.setItem(frontTabSelectedKey, sectionToOpen);
        });
    }

    // if (localStorage.getItem(frontTabSelectedKey) != null && is_mobile()) {
    //     for (let j = 0; j < toggleSections.length; j++) {
    //         toggleSections[j].classList.remove(classFrontToggleSectionActive);
    //     }

    //     for (let j = 0; j < toggleButtons.length; j++) {
    //         toggleButtons[j].classList.remove(classFrontToggleActive);
    //     }

    //     const frontTabChoisedSelector =
    //         localStorage.getItem(frontTabSelectedKey);
    //     document
    //         .querySelector(`${frontTabChoisedSelector}`)
    //         .classList.add(classFrontToggleSectionActive);
    //     document
    //         .querySelector(
    //             `#front_toggle li[data-for="${frontTabChoisedSelector}"]`
    //         )
    //         .classList.add(classFrontToggleActive);
    // }

    document.getElementById("go_to_matches").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('#front_toggle li[data-for="#aside"]').click();
        setTimeout(() => {
            window.scrollTo(0, -9990);
        }, 1000);
    });

    // Адаптив новостных блоков на главной
    if ($(".js-posts-equal").length) {
        const equalPostsBig = () => {
            if (window.innerWidth > 1440 || window.innerWidth <= 1200) {
                $(".post-big").removeAttr("style");
                return;
            }

            $(".js-posts-equal").each(function () {
                const postBig = $(this).find(".post-big");
                const sectionRow = postBig
                    .closest(".row")
                    .children("div:nth-child(2)");
                const needHeight =
                    sectionRow.find(".posts-item:nth-child(1) .post").height() +
                    parseInt(
                        sectionRow
                            .find(".posts-item:nth-child(1)")
                            .css("margin-bottom")
                    ) +
                    sectionRow.find(".posts-item:nth-child(2) .post").height();

                postBig.css({
                    paddingBottom: needHeight,
                });
            });
        };

        equalPostsBig();
        $(window).on("resize", equalPostsBig);
    }
});
