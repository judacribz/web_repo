var td;
var count = 0;
var countMax = 9;
var turns = ['X', 'O'];
var message;
var winnerText;

window.onload = function () {
    message = document.getElementById("message");

    td = document.getElementsByTagName('td');
    for (var i = 0; i < td.length; i++) {
        td[i].row = ~~(i / 3);
        td[i].col = i % 3;
        td[i].onclick = function () {
            selectCell(this);
        }
    }
};


function selectCell(tableCell) {
    if (tableCell.innerHTML.localeCompare("") == 0) {
        tableCell.innerHTML = turns[count++ % 2];

        if (count > 2) {

            if (checkGame(tableCell)) {
                message.innerHTML = "Player " + turns[0] + "'s turn";

                alert("Player " + turns[(count + 1) % 2] + " wins!\n");
                resetCells();
                return;
            }
        }


        message.innerHTML = "Player " + turns[count % 2] + "'s turn";
    }
}

function checkGame(tableCell) {
    var turn = tableCell.innerHTML;


    var ind1 = tableCell.col;
    var ind2 = tableCell.row;

    // Check row
    if (td[getIndex(ind2, (ind1 + 1) % 3)].innerHTML == turn && td[getIndex(ind2, (ind1 + 2) % 3)].innerHTML == turn) {
        return true;
    }

    // Check column
    if (td[getIndex((ind2 + 1) % 3, ind1)].innerHTML == turn && td[getIndex((ind2 + 2) % 3, ind1)].innerHTML == turn) {
        return true;
    }

    // Check diag
    if (ind1 == ind2) {

        if (td[getIndex((ind2 + 1) % 3, (ind1 + 1) % 3)].innerHTML == turn && td[getIndex((ind2 + 2) % 3, (ind1 + 2) % 3)].innerHTML == turn) {
            return true;
        }
    }

    // Check other diag
    if (tableCell.row + tableCell.col == 2) {
        if (td[getIndex((ind2 + 1) % 3, (ind1 + 2) % 3)].innerHTML === turn && td[getIndex((ind2 + 2) % 3, (ind1 + 2) % 3)].innerHTML === turn) {
            return true;
        }
    }


    return false;
}

function getIndex(row, col) {
    return row * 3 + col;
}

function getIndices(ind) {
    var inds = [ind];
    inds.push((ind + 1) % 3);
    inds.push((ind + 2) % 3);

    return inds;
}

function resetCells() {
    count = 0;
    for (var i = 0; i < 9; i++) {
        td[i].innerHTML = "";
    }
}