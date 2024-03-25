import { is_mobile, filter_matches } from "./_functions.js";
import { tns } from "tiny-slider";
import { Datepicker } from "vanillajs-datepicker";

(function () {
    Datepicker.locales.ru = {
        days: [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
        ],
        daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
        daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        months: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ],
        monthsShort: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
        ],
        today: "Сегодня",
        clear: "Очистить",
        format: "dd.mm.yyyy",
        weekStart: 1,
        monthsTitle: "Месяцы",
    };
})();

document.addEventListener("DOMContentLoaded", () => {
    const classActive = "active";
    const sliderControl =
        '<svg class="icon icon-angle-bottom "><use xlink:href="/wp-content/themes/rugby/assets/img/sprite.svg#angle-bottom"></use></svg>';

    if (document.getElementById("matches_days") != null) {
        let args = {
            container: "#matches_days ul",
            items: 10,
            slideBy: "page",
            gutter: 12,
            edgePadding: 12,
            nav: false,
            loop: false,
            mouseDrag: true,
            controlsText: [sliderControl, sliderControl],
            responsive: {
                0: {
                    items: 5,
                    edgePadding: 6,
                },
                576: {
                    items: 8,
                },
                768: {
                    items: 10,
                    edgePadding: 12,
                },
                993: {
                    items: 6,
                },
                1200: {
                    items: 10,
                },
            },
        };

        if (
            $("#matches_days .js-day.active").length ||
            $("#matches_days .js-day.js-nearest-day").length
        ) {
            let i = 0;
            $("#matches_days .js-day").each(function () {
                i++;

                if (
                    ($(this).hasClass(classActive) ||
                        $(this).hasClass("js-nearest-day")) &&
                    i > 2
                ) {
                    args.startIndex = i - 2;
                }
            });
        }

        //Сделано через промис, потому что только так почему-то работает отследивание момента инициализации слайдера
        let daysSliderPromise = new Promise(function (sliderResolve) {
            const slider = tns(args);
            sliderResolve(slider.getInfo());
        });

        daysSliderPromise.then(function (sliderContainer) {
            if (sliderContainer.items >= sliderContainer.slideCount) {
                $("#matches_days").addClass("matches-days--no-slider");
            }

            $("#matches_filter").addClass("matches-filter--visible");
        });

        // const daysSlider = tns(args);

        args.container = "#matches_weeks ul";
        args.items = 4;
        args.onInit = (e) => {
            $("#matches_filter").addClass("matches-filter--visible");
        };
        args.responsive = {
            0: {
                items: 2,
            },
            576: {
                items: 3,
            },
            1200: {
                items: 4,
            },
        };
        const daysSlider = tns(args);

        $("#matches_days .js-day").on("click", function () {
            if ($(this).hasClass(classActive)) {
                return;
            }

            $("#matches_days .day").removeClass(classActive);
            $(this).addClass(classActive);

            const shooseDate = $(this).attr("data-date");
            $("#chosesDate").attr("value", shooseDate);
            $("#filter_week").attr("value", "");
            filter_matches();

            // const nearestDay = filter_matches();
            // console.log(nearestDay);
            // if (nearestDay !== false) {
            //     const daySelector = `.js-day[data-date="${result.data.day}"]`;
            //     if ($(daySelector).length) {
            //         // const slideNum =
            //         console.log(document.querySelector(daySelector).parentNode);
            //     }
            //     // daysSlider.goTo();
            // }
        });

        $("#matches_weeks .js-week").on("click", function () {
            if ($(this).hasClass(classActive)) {
                return;
            }

            $("#matches_weeks .week").removeClass(classActive);
            $(this).addClass(classActive);

            const shooseWeek = $(this).attr("data-week-num");
            $("#filter_week").attr("value", shooseWeek);
            $("#chosesDate").attr("value", "");
            filter_matches();
        });
    } else if (document.getElementById("matches_stages") != null) {
        const stagesCount = $("#matches_stages ul li").length;
        let args = {
            container: "#matches_stages ul",
            items: 5,
            slideBy: "page",
            gutter: 12,
            edgePadding: 12,
            // center: true,
            onInit: (e) => {
                $("#matches_filter").addClass("matches-filter--visible");
            },
            nav: false,
            loop: false,
            mouseDrag: true,
            controlsText: [sliderControl, sliderControl],
            responsive: {
                0: {
                    items: 2.5,
                    // items: 1.5,
                },
                576: {
                    items: 5,
                },
                1200: {
                    items: 8,
                },
            },
        };
        tns(args);

        if (stagesCount < 5 && !is_mobile()) {
            $(".tns-inner").css({ "padding-left": "5px" });
        }

        $("#matches_stages .js-stage").on("click", function () {
            if ($(this).hasClass(classActive)) {
                return;
            }

            $("#matches_stages .stage").removeClass(classActive);
            $(this).addClass(classActive);

            const chooseStage = $(this).attr("data-stage");
            $("#choose_stage").attr("value", chooseStage);
            filter_matches();
        });
    }

    const calendarContainer = document.getElementById(
        "button_calendar_container"
    );

    const buttonCalendar = document.getElementById("button_calendar");
    if (buttonCalendar !== null) {
        const addDatepickerControls = () => {
            if (
                document.querySelector(".datepicker-footer") == null ||
                document.querySelector(
                    ".datepicker-footer button.button.button-primary"
                )
            ) {
                return;
            }

            document.querySelector(".datepicker-footer").innerHTML +=
                '<div class="datepicker-controls-custom">' +
                '<button class="button button-lite" type=\'button\' id="closeDatepicker">' +
                "<div></div>" +
                "<span>Закрыть</span>" +
                "</button>" +
                '<button class="button button-primary" type=\'button\' id="setDateMatches">' +
                "<div></div>" +
                "<span>Применить</span>" +
                "</button>" +
                "</div>";

            document
                .getElementById("closeDatepicker")
                .addEventListener("click", () => {
                    calendarContainer.classList.remove("active");
                });

            document
                .getElementById("setDateMatches")
                .addEventListener("click", () => {
                    const setDateMatchesChoosesDate =
                        datepicker.getDate("yyyy-mm-dd");
                    $("#chosesDate").attr("value", setDateMatchesChoosesDate);
                    $("#matches_days .day").removeClass(classActive);

                    if (
                        $(
                            `#matches_days .day[data-date="${setDateMatchesChoosesDate}"]`
                        ).length
                    ) {
                        $(
                            `#matches_days .day[data-date="${setDateMatchesChoosesDate}"]`
                        ).addClass(classActive);
                    }
                    $("#matches_weeks .week").removeClass(classActive);
                    $("#filter_week").attr("value", "");
                    filter_matches();

                    calendarContainer.classList.remove("active");
                });
        };
        const datepicker = new Datepicker(buttonCalendar, {
            format: "yyyy-mm-dd",
            language: "ru",
            nextArrow: sliderControl,
            prevArrow: sliderControl,
            todayHighlight: true,
        });

        const buttonShowCalendar = document.getElementById(
            "button_show_calendar"
        );
        if (
            typeof buttonShowCalendar !== "undefined" &&
            buttonShowCalendar != null
        ) {
            buttonShowCalendar.addEventListener("click", () => {
                if (!calendarContainer.classList.contains("active")) {
                    calendarContainer.style["top"] = `${
                        buttonShowCalendar.offsetTop + 42 + 8
                    }px`;
                    calendarContainer.classList.add("active");

                    if (is_mobile()) {
                        calendarContainer.style["left"] = `0px`;
                    } else {
                        calendarContainer.style["left"] = `${
                            buttonShowCalendar.offsetLeft -
                            calendarContainer.offsetWidth / 2 +
                            21
                        }px`;
                    }

                    addDatepickerControls();
                } else {
                    calendarContainer.classList.remove("active");
                }
            });

            document.addEventListener("keydown", function (e) {
                if (e.keyCode == 27) {
                    calendarContainer.classList.remove("active");
                }
            });
        }

        document.addEventListener("click", (e) => {
            const withinBoundariesContainer = e
                .composedPath()
                .includes(calendarContainer);
            const withinBoundariesButton = e
                .composedPath()
                .includes(buttonShowCalendar);

            if (!withinBoundariesContainer && !withinBoundariesButton) {
                calendarContainer.classList.remove("active");
            }
        });
    }

    const dateChoiceSeleters = document.querySelectorAll(".js-matches-days");
    const dateSwitchers = document.querySelectorAll(
        "#matches_date_switcher li"
    );
    for (let i = 0; i < dateSwitchers.length; i++) {
        dateSwitchers[i].addEventListener("click", () => {
            const selector = dateSwitchers[i].getAttribute("data-for");

            for (let j = 0; j < dateChoiceSeleters.length; j++) {
                dateChoiceSeleters[j].classList.remove(classActive);
            }

            for (let j = 0; j < dateSwitchers.length; j++) {
                dateSwitchers[j].classList.remove(classActive);
            }

            document.querySelector(selector).classList.add(classActive);
            dateSwitchers[i].classList.add(classActive);
        });
    }
});
