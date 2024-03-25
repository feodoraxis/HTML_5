document.addEventListener("DOMContentLoaded", () => {
    const searchResult = $("#search-result");
    const searchInput = $('input[name="s"]');
    searchInput.on("keyup", function () {
        const self = $(this);
        const val = $(this).val();

        if (val.length < 3) {
            searchResult.removeClass("open", "open--fixed");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action: "search_preview",
                search_request: $(this).val(),
            },
            success: function (result) {
                if (result === "") {
                    searchResult.removeClass("open", "open--fixed");
                    return;
                }
                searchResult.find("ul").html(result);

                console.log(self.position());
                searchResult
                    .css({
                        top: self.offset().top + self.height() + 3,
                        left: self.offset().left,
                        maxWidth: self.width(),
                    })
                    .addClass("open");

                if (self.closest(".header_fixed")) {
                    searchResult.addClass("open--fixed");
                }
            },
        });
    });

    const searchBlockOnSearchPage = $("#search_block_on_search_page");
    searchBlockOnSearchPage.find("input").on("focus", function () {
        searchBlockOnSearchPage.addClass(
            "search_block--on-search-page--active"
        );
    });

    searchBlockOnSearchPage.find("input").on("blur", function () {
        searchBlockOnSearchPage.removeClass(
            "search_block--on-search-page--active"
        );
    });
});
