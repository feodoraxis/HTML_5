import {
    modal_open,
    modal_close,
    count_lines,
    is_mobile,
} from "./_functions.js";
import jQueryValidation from "jquery-validation";
import localization from "jquery-validation/dist/localization/messages_ru.min.js";

function stickySidebarFront() {
    if (is_mobile()) {
        return;
    }

    const classSidebarTopFixed = "sidebar--top-fixed";
    const classSidebarBottomFixed = "sidebar--bottom-fixed";
    const classSidebarBottomAbsolute = "sidebar--bottom-absolute";

    const scrollTop = parseInt($(window).scrollTop());
    const windowHeight = parseInt($(window).height());
    const scrollTopFromBottomBorder = parseInt(scrollTop + windowHeight);

    const sidebar = $("#front_sidebar");
    const sidebarWidth = sidebar.width();
    const sidebarHeight = sidebar.height();
    // const sidebarOffsetTop = parse;
    const sidebarOffsetTopFromBottom = Math.round(
        sidebar?.offset()?.top + sidebarHeight
    );

    const aside = $("#aside");
    if (typeof aside !== "undefined" && aside != null) {
        const sidebarOffsetTop = parseInt(aside?.offset()?.top); //Делаем именно так, т.к. потом будет position fixed у #front_sidebar
        const sidebarHeight = parseInt(sidebar.height());

        const footer = $("#footer");
        const footerOffsetTop = parseInt(footer.offset().top);

        /**
         * Возвращение сайдбара в исходное положение, если вернулись в верх страницы
         */
        //Если высота сайдбара больше высоты окна браузера
        if (sidebarHeight >= windowHeight && scrollTop < 50) {
            sidebar
                .removeClass(
                    classSidebarBottomFixed,
                    classSidebarBottomAbsolute
                )
                .removeAttr("style");
            return;
        } //Если высота сайдбара меньше высоты окна браузера
        else if (sidebarHeight < windowHeight && scrollTop < 130) {
            sidebar
                .removeClass(classSidebarTopFixed, classSidebarBottomAbsolute)
                .removeAttr("style");
            return;
        }

        /**
         * Фиксация сайдбара за пользователем, когда он не в самом верху страницы
         */
        //Высота сайдбара БОЛЬШЕ высоты окна браузреа
        if (sidebarHeight >= windowHeight) {
            //Когда нижняя граница сайдбара ЕЩЕ НЕ дошла до футера
            if (
                scrollTopFromBottomBorder + 50 < footerOffsetTop &&
                scrollTopFromBottomBorder >=
                    sidebarHeight + sidebarOffsetTop + 59
            ) {
                sidebar
                    .css({
                        width: sidebarWidth,
                    })
                    .addClass(classSidebarBottomFixed)
                    .removeClass(classSidebarBottomAbsolute);
            } //Когда нижняя граница сайдбара УЖЕ дошла до футера
            else if (scrollTopFromBottomBorder + 50 >= footerOffsetTop) {
                sidebar
                    .removeAttr("style")
                    .addClass(classSidebarBottomAbsolute)
                    .removeClass(classSidebarBottomFixed);
            } //Когда пользователь возвращается наверх
            else if (
                scrollTopFromBottomBorder <
                sidebarHeight + sidebarOffsetTop + 59
            ) {
                sidebar
                    .removeAttr("style")
                    .removeClass(classSidebarBottomAbsolute)
                    .removeClass(classSidebarBottomFixed);
            }
        } //Высота сайдбара МЕНЬШЕ высоты окна браузреа
        else {
            //Фиксация сверху, когда начали крутить вниз
            if (
                sidebarOffsetTopFromBottom + 113 < footerOffsetTop ||
                sidebar.css("top") == "auto" ||
                sidebar.css("bottom") == "auto" ||
                sidebar?.offset()?.top > scrollTop + 60
            ) {
                sidebar
                    .css({
                        width: sidebarWidth,
                    })
                    .addClass(classSidebarTopFixed)
                    .removeClass(classSidebarBottomAbsolute);
            } //Фикс снизу, когда докрутили до подвала
            else if (
                sidebarOffsetTopFromBottom + 113 >= footerOffsetTop &&
                scrollTopFromBottomBorder + 113 >= footerOffsetTop
            ) {
                sidebar
                    .removeAttr("style")
                    .addClass(classSidebarBottomAbsolute)
                    .removeClass(classSidebarTopFixed);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    $("#wc_open_description").on("click", function () {
        $(this).addClass("open").parent().addClass("open");
    });

    $(".js-form-recall").each(function () {
        $(this).validate();
    });

    $("#form_subscribe").on("submit", function (e) {
        e.preventDefault();

        const self = $(this);
        const modalResultSelector = "#modal_result";
        const modalResult = $(modalResultSelector);

        const adminAjax = self.attr("data-ajax");
        const button = self.find("button");
        const buttonText = button.find("span").text();

        if (
            self.find('input[name="user_name"]').val() == "" ||
            self.find('input[name="user_email"]').val() == ""
        ) {
            return;
        }

        const formData = {
            user_name: self.find('input[name="user_name"]').val().trim(),
            user_email: self.find('input[name="user_email"]').val().trim(),
            iagree: self.find('input[name="iagree"]').val(),
        };

        $.ajax({
            type: "POST",
            url: adminAjax,
            dataType: "json",
            data: {
                action: "form_recall",
                formData: formData,
            },
            beforeSend: function (xhr) {
                button.find("span").text("Загрузка...");
                button.attr("disabled", "disabled");
            },
            error: function (request, status, error) {
                // обрабатываем ошибки
                if (status == 500) {
                    alert("Ошибка при загрузке");
                } else if (status == "timeout") {
                    alert(
                        "Ошибка: Сервер не отвечает. Попробуйте ещё, или напишите в техническую поддержку."
                    );
                } else {
                    const errormsg = request.responseText;
                    const string1 = errormsg.split("<p>");
                    const string2 = string1[1].split("</p>");
                    alert(string2[0]);
                }
            },
            success: function (dataJSON) {
                button.find("span").text(buttonText);
                button.removeAttr("disabled");

                modalResult.find("h1").text(dataJSON.title);
                modalResult.find("p").text(dataJSON.message);

                modal_close(".modal.open");
                modal_open(modalResultSelector);
            },
        });

        return false;
    });

    if ($(".front_page .posts").length) {
        $(".posts-list").each(function (key, list) {
            $(this)
                .find(".post:not(.post-big)")
                .each(function () {
                    if (count_lines($(this).find("h3")) > 2) {
                        $(this).addClass("post--descriptions-lines--sm");
                    }
                });
        });
    }

    const frontSidebar = $("#front_sidebar");
    if (typeof frontSidebar !== "undefined" && frontSidebar != null) {
        $(window).on("scroll", () => {
            stickySidebarFront();
        });

        stickySidebarFront();
    }

    $("#switch_to_news_tab").on("click", function () {
        const needTabSelector = "#content";

        $(`#front_toggle li`).removeClass("front_toggle-active");
        $(`#front_toggle li[data-for="${needTabSelector}"]`).addClass(
            "front_toggle-active"
        );

        $("#aside").removeClass("front_toggle-section_active");
        $(needTabSelector).addClass("front_toggle-section_active");

        $(window).scrollTop(0);
    });
});
