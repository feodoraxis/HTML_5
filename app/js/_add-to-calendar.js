import { is_mobile } from "./_functions.js";
import { atcb_action } from "add-to-calendar-button";

document.addEventListener("DOMContentLoaded", () => {
    const addToCalendar = $("#add_to_calendar");
    const addToCalendarTeam = $(".js-add_to_calendar-team_block");
    const addToCalendarSeason = $(".js-add_to_calendar-season_item");

    const classActiveName = "add_to_calendar-block--active";

    let season = "";

    const li = $(".js-add_to_calendar li[data-for]");
    li.on("click", function () {
        const title = $(this).attr("data-modal-title");
        const nextBlock = $(this).attr("data-for");
        const prevBlock = $(this).attr("data-prev-block");
        const attributeName = $(this).attr("data-attr-name");
        const attribureValue = $(this).attr("data-type");

        addToCalendar.attr(attributeName, attribureValue);

        if (typeof prevBlock !== "undefined" && prevBlock !== null) {
            $(nextBlock)
                .find("[data-add-to-calendar-go]")
                .attr("data-add-to-calendar-go", prevBlock);
        }

        //Фильтруем сезоны, если открываются сезоны
        if (nextBlock === "#add_to_calendar_categories") {
            filterSeasons();
        }

        //Фильтруем команды для добавления в календарь, если открываются команды
        if (nextBlock === "#add_to_calendar_teams") {
            filterTeams();
        }

        openBlock(nextBlock, title);
    });

    const backButton = $("[data-add-to-calendar-go]");
    backButton.on("click", function () {
        const goBlock = $(this).attr("data-add-to-calendar-go");
        const title = $(`#add_to_calendar_modal [data-for="${goBlock}"]`).attr(
            "data-modal-title"
        );

        const attributeName = $(goBlock)
            .find("li[data-attr-name]")
            .attr("data-attr-name");
        addToCalendar.removeAttr(attributeName);

        openBlock(goBlock, title);
    });

    const filterSeasons = () => {
        const gender = addToCalendar.attr("data-gender");
        addToCalendarSeason.addClass("hidden");

        let hasShowSeasons = false;

        addToCalendarSeason.each(function () {
            const seasonsGender = $(this).attr("data-season-gender");
            if (seasonsGender == gender) {
                $(this).removeClass("hidden");
                hasShowSeasons = true;
            }
        });

        $("#add_to_calendar_categories .add_to_calendar-body p").remove();
        if (hasShowSeasons === false) {
            $("#add_to_calendar_categories .add_to_calendar-body").append(
                "<p class='add_to_calendar-not_found_matches'>Нет матчей для добавления</p>"
            );
        }
    };

    const filterTeams = () => {
        const gender = addToCalendar.attr("data-gender");
        season = parseInt(addToCalendar.attr("data-season"));

        addToCalendarTeam.parent().addClass("hidden");

        addToCalendarTeam.each(function (key, block) {
            const teamsSeasons = JSON.parse($(this).attr("data-seasons"));
            const teamsGender = $(this).attr("data-gender");

            if (
                (teamsSeasons.includes(season) && teamsGender == gender) ||
                teamsGender == "any"
            ) {
                $(this).parent().removeClass("hidden");
            }
        });
    };

    const openBlock = (blockSelector, title) => {
        $(".js-add_to_calendar-block").removeClass(classActiveName);
        $(blockSelector).addClass(classActiveName);

        if (
            typeof title !== "undefined" &&
            title !== null &&
            title.trim() !== ""
        ) {
            $("#add_to_calendar_modal h1").text(title);
        } else {
            $("#add_to_calendar_modal h1").text(
                "Добавление матчей в календарь"
            );
        }
    };

    let config = {
        name: "[Reminder] Test the Add to Calendar Button",
        options: ["iCal"],
        language: "ru",
        timeZone: "Europe/Moscow",
    };

    const addToCalendarButton = $("#add_to_calendar_button");
    addToCalendarButton.on("click", function () {
        // Получим ID команд, матчи которых хотим получить
        let teamsIds = [];
        if ($("#team_all").is(":checked")) {
            addToCalendarTeam.each(function (key, block) {
                if ($(this).find("input").attr("value") !== "all") {
                    teamsIds.push($(this).find("input").attr("value"));
                }
            });
        } else {
            addToCalendarTeam.each(function (key, block) {
                if ($(this).find("input").is(":checked")) {
                    teamsIds.push($(this).find("input").attr("value"));
                }
            });
        }

        $.ajax({
            type: "POST",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action: "get_teams_matches",
                form: {
                    teams_ids: teamsIds,
                    season: season,
                },
            },
            beforeSend: function (xhr) {
                addToCalendarButton

                    .attr("disabled", "disabled")
                    .find("span")
                    .text("Загрузка...");
            },
            error: function (request, status, error) {
                // обрабатываем ошибки
                if (status == 500) {
                    alert("Ошибка при добавлении ответа");
                } else if (status == "timeout") {
                    alert(
                        "Ошибка: Сервер не отвечает. Попробуйте ещё, или напишите в поддержку."
                    );
                }
            },
            success: function (result) {
                $("#add_to_calendar_alert").removeClass("show");
                $("#add_to_calendar_alert p").text("");

                if (result.success == true) {
                    config.dates = result.data.events;

                    const fakeButton = document.createElement("button");
                    fakeButton.style.display = "none";

                    atcb_action(config, fakeButton);
                    fakeButton.click();
                } else {
                    $("#add_to_calendar_alert").addClass("show");
                    $("#add_to_calendar_alert p").text(result.data.message);
                }

                addToCalendarButton
                    .removeAttr("disabled")
                    .find("span")
                    .text("Добавить");
            },
        });

        return false;
    });

    const teamCard = $(".js-add_to_calendar--team_card");
    teamCard.on("click", function () {
        const checkbox = $(this).parent().find("input");
        checkbox.prop("checked", !checkbox.is(":checked"));
    });
});
