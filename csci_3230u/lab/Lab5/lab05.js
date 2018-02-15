const SELECT = "selected";
const DESELECT = "deselected";
const ROW = "row";
const COLUMN = "col";

var inputTag;
var currCell = "";
var savedVal = 0;

window.onload = function () {
    deselectAll();
};

function selectRow(studentNum) {
    var row = studentNum.getAttribute(ROW);
    var cells = document.querySelectorAll('[row="' + row + '"]');
    deselectAll();
    setAttrForAll(cells, SELECT, 1);
};

function selectCol(assignment) {
    var col = assignment.getAttribute(COLUMN);
    var cells = document.querySelectorAll('[col="' + col + '"]');
    deselectAll();
    setAttrForAll(cells, SELECT, 1);
};

function selectCell(grade) {
    var row = grade.getAttribute('row');
    var col = grade.getAttribute('col')

    var cell = document.querySelector('[row="' + row + '"][col="' + col + '"]');

    deselectAll();

    if (cell.getAttribute('class') == DESELECT) {

        savedVal = cell.innerHTML;
        currCell = cell;
        currCell.innerHTML = "";

        inputTag = document.createElement('input');
        inputTag.setAttribute('onkeypress', "enterMsg(event)");
        inputTag.setAttribute('type', 'number');
        inputTag.setAttribute('lastValue', "'" + savedVal + "'");
        inputTag.value = savedVal;

        currCell.appendChild(inputTag);
        inputTag.focus();
        inputTag.select();
        currCell.setAttribute("class", SELECT);
    }
}

function deselectAll() {

    if (currCell != "") {
        currCell.innerHTML = savedVal;
    }
    var cells = document.getElementsByTagName("td");
    setAttrForAll(cells, DESELECT);
}

function setAttrForAll(cells, attr, i = 0) {
    for (i; i < cells.length; i++) {
        cells[i].setAttribute('class', attr);
    }
}

function enterMsg(e) {
    if (e.keyCode === 13) {
        currCell.innerHTML = inputTag.value;
        currCell = "";
    }
}