import { get_document_row } from "./_functions.js";

document.addEventListener("DOMContentLoaded", () => {
    if (!$("#regions_section_search").length) {
        return;
    }

    const inputField = $("#regions_search_input");

    let lastOpenedSectionSelector = null;
    inputField.on("keyup", () => {
        let results = [];
        const request = inputField.val();
        const localSearchResultObject = $("#local_search_result");
        $(".js-region-item").each(function () {
            const regionName = " " + $(this).find("a").text().toLowerCase();
            if (regionName.indexOf(request.toLowerCase()) > -1) {
                results.push({
                    title: $(this).find("a").text(),
                    link: $(this).find("a").attr("href"),
                    email: $(this).find(".js-region-email").text(),
                });
            }
        });

        if (results.length && request.length > 2) {
            if (lastOpenedSectionSelector == null) {
                lastOpenedSectionSelector =
                    "#" + $("#regions-links .js-tabs-block.active").attr("id");
                $("#regions-links .js-tabs-block.active").removeClass("active");
            }

            localSearchResultObject.find("tbody").html("");
            results.forEach((current) => {
                localSearchResultObject
                    .find("tbody")
                    .append(getRegionRow(current));
            });

            localSearchResultObject.addClass("active");
        } else {
            localSearchResultObject.find("tbody").html("");
            localSearchResultObject.removeClass("active");
            $(lastOpenedSectionSelector).addClass("active");
            lastOpenedSectionSelector = null;
        }
    });

    const getRegionRow = (regionObject) => {
        return `<tr>
            <td><a href="${regionObject.link}">${regionObject.title}</a></td>
            <td>${regionObject.email}</td>
        </tr>`;
    };
});
