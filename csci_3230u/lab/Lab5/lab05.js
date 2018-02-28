const SELECT = "selected";
const DESELECT = "deselected";
const ROW = "row";
const COLUMN = "col";

var td, numStudents, numAsmts;

var inputTag;
var currCell = "";
var savedVal = 0;

window.onload = function () {
    td = document.getElementsByTagName('td');
    for (var i = 0; i < td.length; i++) {
        td[i].index = i;
        td[i].onclick = function () {
            selectCell(this);
        }
    }

    thAsmt = document.querySelectorAll('tr:nth-of-type(1) th:nth-of-type(n+2)');
    numAsmts = thAsmt.length;
    for (var i = 0; i < numAsmts; i++) {
        thAsmt[i].index = i;
        thAsmt[i].onclick = function () {
            selectCol(this);
        }
    }

    thStudentId = document.querySelectorAll('tr:nth-of-type(n+2) th');
    numStudents = thStudentId.length;
    for (var i = 0; i < numStudents; i++) {
        thStudentId[i].index = i;
        thStudentId[i].onclick = function () {
            selectRow(this);
        }
    }
};

function selectRow(tableCell) {
    deselectAll();

    var startInd = tableCell.index * numAsmts;
    for (var i = startInd; i < (startInd + numAsmts); i++) {
        td[i].classList.toggle(SELECT);
    }
}

function selectCol(tableCell) {
    deselectAll();

    var startInd = tableCell.index;
    for (var i = startInd; i < td.length; i += numAsmts) {
        td[i].classList.toggle(SELECT);
    }
}

function selectCell(tableCell) {
    deselectAll();
    tableCell.classList.toggle(SELECT);

    if (currCell != "") {
        currCell.innerHTML = savedVal;
    }

    currCell = tableCell;
    savedVal = tableCell.innerHTML;
    tableCell.innerHTML = "";

    inputTag = document.createElement('input');
    inputTag.setAttribute('onkeypress', "enterMsg(event)");
    inputTag.setAttribute('type', 'number');
    inputTag.setAttribute('lastValue', "'" + savedVal + "'");
    inputTag.value = savedVal;

    tableCell.appendChild(inputTag);
    inputTag.focus();
    inputTag.select();
    tableCell.setAttribute("class", SELECT);
}

function deselectAll() {
    toggleAll(
        document.querySelectorAll('[class="' + SELECT + '"]'),
        SELECT
    );
}

function toggleAll(cells, attr) {
    for (var i = 0; i < cells.length; i++) {
        cells[i].classList.toggle(attr);
    }
}

function enterMsg(e) {
    if (e.keyCode === 13) {
        currCell.innerHTML = inputTag.value;
        currCell = "";
    }
}