import {
    is_mobile,
    before_modal_open,
    after_modal_close,
} from "./_functions.js";

document.addEventListener("DOMContentLoaded", () => {
    const adaptivePostsIcons = () => {
        if (!is_mobile() || $(window).width() > 576 || !$(".post-big").length) {
            if ($(".post-big").length) {
                $(
                    ".post-big:not(.post-sm-default) .post-icon .icon"
                ).removeAttr("style");
            }
            return;
        }

        if (!is_mobile()) {
            $(".post-big:not(.post-sm-default)").each(function () {
                const postDate = $(this).find(".post-date");
                const bottom =
                    $(this).find(".post-title").height() +
                    parseInt(postDate.css("margin-bottom")) +
                    postDate.height() +
                    18 +
                    10;

                $(this).find(".post-icon .icon").css({
                    bottom: bottom,
                });
            });
        } else {
            $(".post-big:not(.post-sm-default)").each(function () {
                const postDate = $(this).find(".post-date");
                const bottom =
                    $(this).find(".post-title").height() +
                    parseInt(postDate.css("margin-bottom")) +
                    18;

                $(this).find(".post-icon .icon-camera").css({
                    bottom: bottom,
                });
            });
        }
    };

    adaptivePostsIcons();
    $(window).on("resize", adaptivePostsIcons);
});
