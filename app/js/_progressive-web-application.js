import PullToRefresh from 'pulltorefreshjs';

const isInStandaloneMode = () => (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone ||
    document.referrer.includes('android-app://')
);

document.addEventListener('DOMContentLoaded', () => {
    if (!isInStandaloneMode()) {
        return;
    }

    const ptr = PullToRefresh.init({
        mainElement: 'body',
        instructionsPullToRefresh: "Потяните вниз, чтобы обновить",
        instructionsReleaseToRefresh: "Отпустите, чтобы обновить",
        instructionsRefreshing: "Обновление",
        onRefresh() {
            window.location.reload();
        }
    });
});