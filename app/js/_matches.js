import { is_mobile } from './_functions.js';
import { tns } from 'tiny-slider';
import { Datepicker }from 'vanillajs-datepicker';

(function () {
    Datepicker.locales.ru = {
        days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
        daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        today: "Сегодня",
        clear: "Очистить",
        format: "dd.mm.yyyy",
        weekStart: 1,
        monthsTitle: 'Месяцы'
    }
})();

document.addEventListener('DOMContentLoaded', () => {

    if ( document.getElementById('matches_days') == null ) {
        return;
    }

    const sliderControl = '<svg class="icon icon-angle-bottom "><use xlink:href="img/sprite.svg#angle-bottom"></use></svg>';
    let args = {
        container: '#matches_days ul',
        items: 10,
        slideBy: 'page',
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
            }
        }
    }

    tns( args );

    args.container = '#matches_weeks ul';
    args.items = 5.5;
    args.responsive = {
        0: {
            items: 2
        },
        576: {
            items: 3
        },
        1200: {
            items: 5.5,
        }
    };
    tns( args );

    


    const calendarContainer = document.getElementById('button_calendar_container');
    const buttonCalendar = document.getElementById('button_calendar');
    const addDatepickerControls = () => {
        if ( document.querySelector('.datepicker-footer') == null || document.querySelector('.datepicker-footer button.button.button-primary') ) {
            return;
        }

        document.querySelector('.datepicker-footer').innerHTML += "<div class=\"datepicker-controls-custom\">" +
                                                                        "<button class=\"button button-lite\" id=\"closeDatepicker\">" +
                                                                            "<div></div>" +
                                                                            "<span>Закрыть</span>" +
                                                                        "</button>" +
                                                                        "<button class=\"button button-primary\" id=\"setDateMatches\">" +
                                                                            "<div></div>" +
                                                                            "<span>Применить</span>" +
                                                                        "</button>" +
                                                                    "</div>";

        document.getElementById('closeDatepicker').addEventListener('click', () => {
            calendarContainer.classList.remove('active');
        });

        document.getElementById('setDateMatches').addEventListener('click', () => {
            document.getElementById('chosesDate').setAttribute('value', datepicker.getDate('yyyy-mm-dd'));
            calendarContainer.classList.remove('active');
        });
    };
    const datepicker = new Datepicker(buttonCalendar, {
        format: 'yyyy-mm-dd',
        language: 'ru',
        nextArrow: sliderControl,
        prevArrow: sliderControl,
        todayHighlight: true
    });

    const buttonShowCalendar = document.getElementById('button_show_calendar');
    buttonShowCalendar.addEventListener('click', () => {

        if ( !calendarContainer.classList.contains( 'active' ) ) {
            calendarContainer.style['top'] = `${buttonShowCalendar.offsetTop + 42 + 8}px`;
            calendarContainer.classList.add('active');

            if ( is_mobile() ) {
                calendarContainer.style['left'] = `0px`;
            } else {
                calendarContainer.style['left'] = `${buttonShowCalendar.offsetLeft - (calendarContainer.offsetWidth / 2) + 21}px`;
            }

            addDatepickerControls();
        } else {
            calendarContainer.classList.remove('active');
        }
    });

    

    document.addEventListener('keydown', function(e) {
        if ( e.keyCode == 27 ) { 
            calendarContainer.classList.remove('active');
        }
    });
 
    document.addEventListener( 'click', (e) => {
        const withinBoundariesContainer = e.composedPath().includes(calendarContainer);
        const withinBoundariesButton = e.composedPath().includes(buttonShowCalendar);
    
        if ( ! withinBoundariesContainer && ! withinBoundariesButton ) {
            calendarContainer.classList.remove('active');
        }
    })




    const classActive = 'active';
    const dateChoiceSeleters = document.querySelectorAll('.js-matches-days');
    const dateSwitchers = document.querySelectorAll('#matches_date_switcher li');
    for ( let i = 0; i < dateSwitchers.length; i++ ) {
        dateSwitchers[ i ].addEventListener('click', () => {
            const selector = dateSwitchers[ i ].getAttribute('data-for');

            for ( let j = 0; j < dateChoiceSeleters.length; j++ ){
                dateChoiceSeleters[j].classList.remove( classActive );
            }

            for ( let j = 0; j < dateSwitchers.length; j++ ){
                dateSwitchers[j].classList.remove( classActive );
            }

            document.querySelector( selector ).classList.add( classActive );
            dateSwitchers[ i ].classList.add( classActive );
        });
    }
    
});