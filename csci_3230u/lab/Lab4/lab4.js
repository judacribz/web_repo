const SELECT = "selected";
const DESELECT = "deselected";
const ROW = "row";
const COLUMN = "col";

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
    var cell = document.querySelector(
        '[row="' + row + '"][col="' + col + '"]');

    if (cell.getAttribute('class') == SELECT) {
        deselectAll();
    } else {
        deselectAll();
        cell.setAttribute("class", SELECT);
    }
}

function deselectAll() {
    var cells = document.getElementsByTagName("td");
    setAttrForAll(cells, DESELECT);
}

function setAttrForAll(cells, attr, i = 0) {
    for (i; i < cells.length; i++) {
        cells[i].setAttribute('class', attr);
    }
}