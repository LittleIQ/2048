let game = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
let canmove = [];
let scorce = 0;
let play = true;
function init() {
    game = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    addTile();
    addTile();
    scorce = 0;
    play = true;
    $('#scorce').html('scorce: '+scorce);
    $('.game-over').fadeOut();
    updateView();
}

function addTile() {
    let empty = getEmpty(game);
    let num = getRandomInt(empty.length);
    newTileNode(empty[num], getStartR());
}

function getEmpty(array) {
    let res = [];
    for (let i in array) {
        for (let j in array[i]) {
            if (array[i][j] == 0)
                res.push(i + ',' + j);
        }
    }
    return res;
}

function getStartR() {
    if (getRandomInt(2) == 0)
        return 2;
    else
        return 4;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function newTileNode(xy, value) {
    xy = xy.split(',');
    let x = xy[0], y = xy[1];
    game[x][y] = parseInt(value);
}

function updateView() {
    let tileContainer = $('.tile-container');
    tileContainer.html('');
    for (let i in game) {
        for (let j in game[i]) {
            if (game[i][j] !== 0) {
                let str = '<div class="tile tile-position-' + (parseInt(j)+1) + '-' + (parseInt(i)+1) + ' tile-' + game[i][j] + '" style="display:none;"><div class="tile-inner">' + game[i][j] + '</div></div>';
                let now = tileContainer.html();
                tileContainer.html(now + str);
            }
            if(game[i][j]===2048){
                $('.game-over p').html('2048！恭喜你！');
                $('.game-over').fadeIn();
                play = false;
            }
        }
    }
    $('.tile').fadeIn();
}

function move(arr) {
    let i, nextI, len, m;
    len = arr.length;
    for (i = 0; i < len; i += 1) {
        //先找nextI
        nextI = -1;
        for (m = i + 1; m < len; m++) {
            if (arr[m] !== 0) {
                nextI = m;
                break;
            }
        }

        if (nextI !== -1) {
            //存在下个不为0的位置
            if (arr[i] === 0) {
                arr[i] = arr[nextI];
                arr[nextI] = 0;
                i -= 1;
            } else if (arr[i] === arr[nextI]) {
                scorce += arr[i];
                arr[i] = arr[i] * 2;
                arr[nextI] = 0;
            }
        }
    }
    return arr;
}

function moveLeft() {
    let newOne = game;
    for (let i in newOne) {
        game[i] = move(newOne[i]);
    }
}

function moveRight() {
    let newOne = game;
    for (let i in newOne) {
        game[i] = move(newOne[i].reverse()).reverse();
    }
}

function moveUp() {
    let newOne = reverseTwo(game);
    for (let i in newOne) {
        newOne[i] = move(newOne[i]);
    }
    game = reverseTwo(newOne);
}

function moveDown() {
    let newOne = reverseTwo(game);
    for (let i in newOne) {
        newOne[i] = move(newOne[i].reverse()).reverse();
    }
    game = reverseTwo(newOne);
}

function reverseTwo(arr1) {
    let arr2 = [[], [], [], []];
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr1[i].length; j++) {
            arr2[j][i] = arr1[i][j];
        }
    }
    return arr2;
}

function canUp(){
    let i,j;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4 - 1; j++) {
            if (game[j][i] > 0 && game[j][i] === game[j + 1][i]) {
                return true;
            }
            if (game[j][i] === 0 && game[j + 1][i] > 0) {
                return true;
            }
        }
    }
    return false;
}

function canDown(){
    let i,j;
    for (i = 0; i < 4; i++) {
        for (j = 1; j < 4; j++) {
            if (game[j][i] > 0 && game[j][i] === game[j - 1][i]) {
                return true;
            }
            if (game[j][i] === 0 && game[j - 1][i] > 0) {
                return true;
            }
        }
    }
    return false;
}

function canLeft(){
    let i,j;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4 - 1; j++) {
            if (game[i][j] > 0 && game[i][j] === game[i][j + 1]) {
                return true;
            }
            if (game[i][j] === 0 && game[i][j + 1] > 0) {
                return true;
            }
        }
    }
    return false;
}

function canRight(){
    let i,j;
    for (i = 0; i < 4; i++) {
        for (j = 1; j < 4; j++) {
            if (game[i][j] > 0 && game[i][j] === game[i][j - 1]) {
                return true;
            }
            if (game[i][j] === 0 && game[i][j - 1] > 0) {
                return true;
            }
        }
    }
    return false;
}