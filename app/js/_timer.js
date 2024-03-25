import { is_mobile } from "./_functions.js";

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".js-timer") == null) {
        return;
    }

    // const deadline = new Date( Date.now() + 54000 );

    const set_deadline = $(".js-timer").attr("data-deadline");
    const deadline = new Date(new Date(set_deadline).getTime() + 54000);

    let timerId = null;
    function declensionNum(num, words) {
        return words[
            num % 100 > 4 && num % 100 < 20
                ? 2
                : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
        ];
    }

    function countdownTimer() {
        const d = new Date();

        // convert to msec
        // subtract local time zone offset
        // get UTC time in msec
        const utc = d.getTime() + d.getTimezoneOffset() * 60000;
        const diff = deadline - new Date(utc + 3600000 * "+3");
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

        if ($(".js-timer-days").length) {
            $days.textContent = days < 10 ? "0" + days : days;
        }

        $hours.textContent = hours < 10 ? "0" + hours : hours;
        $minutes.textContent = minutes < 10 ? "0" + minutes : minutes;

        if (document.querySelector(".js-timer-seconds") != null) {
            $seconds.textContent = seconds < 10 ? "0" + seconds : seconds;
        }

        if (document.querySelector(".js-timer-days") != null) {
            $days.dataset.title = declensionNum(days, ["день", "дня", "дней"]);
        }

        $hours.dataset.title = declensionNum(hours, ["час", "часа", "часов"]);
        $minutes.dataset.title = declensionNum(minutes, [
            "минута",
            "минуты",
            "минут",
        ]);

        if (document.querySelector(".js-timer-seconds") != null) {
            $seconds.dataset.title = declensionNum(seconds, [
                "секунда",
                "секунды",
                "секунд",
            ]);
        }
    }

    // console.log(document.querySelector('.js-timer-days') != null);
    let $days;
    if ($(".js-timer-days").length) {
        $days = document.querySelector(".js-timer-days");
    }

    let $hours = document.querySelector(".js-timer-hours");
    let $minutes = document.querySelector(".js-timer-minutes");
    let $seconds;
    if (document.querySelector(".js-timer-seconds") != null) {
        $seconds = document.querySelector(".js-timer-seconds");
    }

    countdownTimer();
    timerId = setInterval(countdownTimer, 1000);
});
