export function is_mobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}
export function is_OSX() {
    return navigator.platform.match(/(Mac|iPhone|iPod|iPad|Android)/i)
        ? true
        : false;
}
export function before_modal_open() {
    let css = {
        overflow: "hidden",
    };

    $("html").css(css);

    if (!is_mobile() && !is_OSX()) {
        css["padding-right"] = "17px";
    }

    $("body").css(css);
}

export function after_modal_close() {
    $("html,body").removeAttr("style");
}

export function modal_open(selector) {
    before_modal_open();
    $(selector).addClass("open");
}

export function modal_close(selector) {
    $(selector).removeClass("open");
    after_modal_close();
}

export function make_switcher_blocks(selector_first, selector_second) {
    if (
        typeof $(selector_first) == "undefined" ||
        typeof $(selector_second) == "undefined"
    ) {
        return;
    }

    $(`${selector_first}, ${selector_second}`).addClass(
        "switcher-block js-switcher-block"
    );
    $(selector_first).addClass("active");
}

export function footer_switcher_toggle(selector, scrolltop) {
    if (typeof $(selector) == "undefined") {
        return;
    }

    if ($(window).scrollTop() > scrolltop) {
        $(selector).addClass("active");
    } else {
        $(selector).removeClass("active");
    }
}

export function table_fix_header_toggle(parent_selector, scrolltop) {
    if (typeof $(parent_selector) == "undefined") {
        return;
    }

    const tableFix = $(parent_selector).find(".table-header_fix");
    const tableMain = $(parent_selector).children(".table");

    if ($(window).scrollTop() > scrolltop) {
        let i = 1;

        tableMain
            .find("thead")
            .find("th")
            .each(function () {
                tableFix
                    .find("thead")
                    .find(`th:nth-child(${i})`)
                    .width($(this).width());
                i++;
            });

        tableFix.addClass("active");
    } else {
        tableFix.removeClass("active");
    }
}

export function MapRegions(options) {
    var _this = this;
    this.items = options.items;

    this.render = function () {
        _this.items.forEach(function (item) {
            $("#" + item.id)
                .attr("data-name", item.name)
                .addClass("cls-1")
                .removeClass("cls-2")
                .on("click", function () {
                    location.href = item.link;
                });
        });
    };

    this.init = function () {
        _this.render();
    };
}

export function plural_format_word(number, after) {
    const cases = [2, 0, 1, 1, 1, 2];

    return (
        number +
        " " +
        after[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : cases[Math.min(number % 10, 5)]
        ]
    );
}

export function filter_matches(onlySeason = false, onlySort = false) {
    const pathName = location.pathname;
    const serializedArrayFormRequest = $(
        "#matches_filter_form"
    ).serializeArray();
    let urlFormRequest, serializedFormRequest;

    //Если выбрали сезон, то остальные праметры сбрасываем, т.к. они могут оказаться неактуальны
    if (onlySeason === true) {
        const newRequest = serializedArrayFormRequest.filter(
            (element) => element.name == "filter[tournament]"
        );
        urlFormRequest = serializedArrayToUrlSerialize(newRequest);
        serializedFormRequest = urlFormRequest;
    } else {
        serializedFormRequest = $("#matches_filter_form").serialize();
        urlFormRequest = serializedFormRequest.replaceAll("%20", "+");
    }

    window.history.pushState(
        {},
        document.title,
        `${pathName}?${urlFormRequest}`
    );

    if (
        (serializedArrayFormRequest[1]?.value !== "Все клубы" &&
            serializedArrayFormRequest[1]?.value !== "none") ||
        serializedArrayFormRequest[2]?.value !== "" ||
        (serializedArrayFormRequest[3]?.value !== "" &&
            serializedArrayFormRequest[3]?.name !== "sort")
    ) {
        $("#matches_sort_container").detach();
        $("#matches_list").removeClass("matches-list--show-all");
    }

    let nearestDay = "";

    $.ajax({
        type: "POST",
        url: "/wp-admin/admin-ajax.php",
        data: serializedFormRequest + "&action=matches_filter",
        error: function (request, status, error) {
            // обрабатываем ошибки
            if (status == 500) {
                alert("Ошибка при добавлении ответа");
            } else if (status == "timeout") {
                alert(
                    "Ошибка: Сервер не отвечает. Попробуйте ещё, или напишите в поддержку."
                );
            } else {
                const errormsg = request.responseText;
                const string1 = errormsg.split("<p>");
                const string2 = string1[1].split("</p>");
                alert(string2[0]);
            }
        },
        success: function (result) {
            if (result.data.message === "nothing") {
                $("#matches_list").html("<p>Ничего не найдено</p>");
            } else {
                $("#matches_list").html(result.data.content);

                if (
                    serializedArrayFormRequest[0]?.name ===
                        "filter[tournament]" &&
                    serializedArrayFormRequest[0]?.value !== "none" &&
                    serializedArrayFormRequest[0]?.value !== ""
                ) {
                    $(".js-day.active, .js-week.active").removeClass("active");
                }

                // if (
                //     typeof result.data.day !== "undefined" &&
                //     result.data.day != null
                // ) {
                //     return result.data.day;
                //     // console.log(result.data.day);
                //     // nearestDay = "" + result.data.day;
                // }
            }
        },
    });

    return false;

    // console.log(nearestDay);
    // if (nearestDay == "") {
    //     return false;
    // } else {
    //     return nearestDay;
    // }
}

export function serializedArrayToUrlSerialize(array) {
    let output = "";

    array.map((element) => {
        if (output !== "") {
            output += "&";
        }

        output +=
            element["name"].replace("[", "%5B").replace("]", "%5D") +
            "=" +
            element.value;
    });

    return output;
}

export function count_lines(jqObject) {
    // const el = document.querySelector(selector);
    const divHeight = jqObject.height();
    const lineHeight = parseInt(jqObject.css("line-height"));
    return parseInt(divHeight / lineHeight);
}

export function get_document_row(documentObject) {
    return `<tr>
        <td><a href="${documentObject.file}" download>${documentObject.name}</a></td>
    </tr>`;
}

export function reverseArr(input) {
    var ret = new Array();
    for (var i = input.length - 1; i >= 0; i--) {
        // ret.push(input[i]);
        ret[i] = input;
    }
    return ret;
}
