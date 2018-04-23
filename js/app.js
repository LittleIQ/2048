$(window).ready(() => {
    init();
});
var gameM = {  // Left key.
    ARROW_LEFT: 37,
    // Up key.
    ARROW_UP: 38,
    // Right key.
    ARROW_RIGHT: 39,
    // Down key.
    ARROW_DOWN: 40
}
touch.on($(window), 'swipeleft swiperight swipeup swipedown', (ev) => {
    switch (ev.type) {
        case 'swipeleft':
            if (canLeft()) {
                moveLeft();
                addTile();
                updateView();
            }
            break;
        case 'swipeup':
            if (canUp()) {
                moveUp();
                addTile();
                updateView();
            }
            break;
        case 'swiperight':
            if (canRight()) {
                moveRight();
                addTile();
                updateView();
            }
            break;
        case 'swipedown':
            if (canDown()) {
                moveDown();
                addTile();
                updateView();
            }
            break;
    }
    $('#scorce').html('scorce: ' + scorce);
    if (!(canLeft() || canRight() || canUp() || canDown())) {
        $('.game-over').fadeIn();
    }
});
$(window).keyup((event) => {
    switch (event.keyCode) {
        case gameM.ARROW_LEFT:
            if (canLeft()) {
                moveLeft();
                addTile();
                updateView();
            }
            break;
        case gameM.ARROW_UP:
            if (canUp()) {
                moveUp();
                addTile();
                updateView();
            }
            break;
        case gameM.ARROW_RIGHT:
            if (canRight()) {
                moveRight();
                addTile();
                updateView();
            }
            break;
        case gameM.ARROW_DOWN:
            if (canDown()) {
                moveDown();
                addTile();
                updateView();
            }
            break;
    }
    $('#scorce').html('scorce: ' + scorce);
    if (!(canLeft() || canRight() || canUp() || canDown())) {
        $('.game-over').fadeIn();
    }
});