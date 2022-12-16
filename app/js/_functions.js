export function is_mobile() {return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));}
export function is_OSX() {return navigator.platform.match(/(Mac|iPhone|iPod|iPad|Android)/i) ? true : false;}
export function before_modal_open() {
    let css = {
        'overflow': 'hidden'
    };

    $("html").css(css);

    if ( !is_mobile() && !is_OSX() ) {
        css['padding-right'] = '17px';
    }

    $('body').css(css);
}

export function after_modal_close() {
    $("html,body").removeAttr('style');
}

export function make_switcher_blocks( selector_first, selector_second ) {
    if ( typeof $(selector_first) == 'undefined' || typeof $(selector_second) == 'undefined' ) {
        return;
    }

    $(`${selector_first}, ${selector_second}`).addClass('switcher-block js-switcher-block');
    $(selector_first).addClass('active');
}

export function footer_switcher_toggle( selector, scrolltop ) {

    if ( typeof $(selector) == 'undefined' ) {
        return;
    }

    if ( $(window).scrollTop() > scrolltop ) {
        $(selector).addClass('active');
    } else {
        $(selector).removeClass('active');
    }
}

export function table_fix_header_toggle( parent_selector, scrolltop ) {

    if ( typeof $(parent_selector) == 'undefined' ) {
        return;
    }

    const tableFix = $(parent_selector).find('.table-header_fix');
    const tableMain = $(parent_selector).children('.table');

    if ( $(window).scrollTop() > scrolltop ) {
        let i = 1;

        tableMain.find('thead').find('th').each(function() {
            tableFix.find('thead').find(`th:nth-child(${i})`).width( $(this).width() );
            i++;
        });

        tableFix.addClass('active');
    } else {
        tableFix.removeClass('active');
    }
}

export function MapRegions(options) {
    var _this = this;
    this.items = options.items;

    this.render = function ()
    {
        _this.items.forEach(function (item) {
            $('#'+item.id).attr('data-name', item.name).addClass('cls-1').removeClass('cls-2').on('click', function () {
                location.href = item.link;
            });

        })
    };

    this.init = function ()
    {
        _this.render();
    };
}