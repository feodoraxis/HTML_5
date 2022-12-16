import selectize from '@selectize/selectize';

document.addEventListener('DOMContentLoaded', () => {
    $("select").selectize({
        onDropdownOpen: function (e) {
            const dropdownTop = parseInt(e.css('top')) + 10;
            e.css('top', dropdownTop);
        }
    });
});