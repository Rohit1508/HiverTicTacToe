/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let count = 0;
let winStatus = 0;
function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}
function checkStatus() {
    if (count >= 3) {
        winStatus = gameOver();
        if (winStatus == 1) {
            setTimeout('alert("YOU WON")', 0);
            resetGame();
            return 1;
        }
        if (winStatus === 2) {
            setTimeout('alert("YOU LOOSE")', 0);
            resetGame();
            return 1;
        }
    }
    return 0;
}

function onBoxClick() {
    count++;
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    let status = checkStatus();
    if (status == 0) {
        if (count < 8) {
            botTurn();
            checkStatus();
        }
    }
    addClickHandlers();
}
function resetGame() {
    count = 0;
    winStatus = 0;
    grid.splice(0, 3);
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}
function find_random(random) {
    return random[Math.floor(Math.random() * random.length)];
}
function botTurn() {
    count++;
    let random = [0, 1, 2];
    let row_random = find_random(random);
    let col_random = find_random(random);
    while (grid[row_random][col_random] !== 0) {
        row_random = find_random(random);
        col_random = find_random(random);
    }
    let newValue = 2;
    grid[row_random][col_random] = newValue;
    renderMainGrid();
}
function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}
function rowCrossed() {
    for (let i = 0; i < GRID_LENGTH; i++) {
        if (grid[i][0] == grid[i][1] &&
            grid[i][1] == grid[i][2]
        ) {
            if (grid[i][0] === 1)
                return 1;
            if (grid[i][0] === 2) {
                return 2
            }
        }
    }
    return 0;
}

function columnCrossed() {
    for (let i = 0; i < GRID_LENGTH; i++) {
        if (grid[0][i] == grid[1][i] &&
            grid[1][i] == grid[2][i]) {
            if (grid[0][i] === 1)
                return 1;
            if (grid[0][i] === 2)
                return 2;
        }
    }
    return 0;
}

function diagonalCrossed() {
    if (grid[0][0] == grid[1][1] &&
        grid[1][1] == grid[2][2]) {
        if (grid[0][0] === 1)
            return 1;
        if (grid[0][0] === 2)
            return 2;
    }

    if (grid[0][2] == grid[1][1] &&
        grid[1][1] == grid[2][0]) {
        if (grid[0][2] === 1)
            return 1;
        if (grid[0][2] === 2)
            return 2;
    }
    return 0;
}
function gameOver() {
    return (rowCrossed() || columnCrossed()
        || diagonalCrossed());
}

initializeGrid();
renderMainGrid();
addClickHandlers();
