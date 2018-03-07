// Constants
// ============================================================================
const CLASS_SELECT = "selected";
const TAG_TD = "td";
const TAG_TH = "th";
const TAG_TR = "tr";

// Globals
// ============================================================================
var currCell = "";
var $inputTag = $('<input/>').attr("type", "number");
var savedVal;


// ============================================================================
// ON READY
// ============================================================================
$(document).ready(function () {

    $inputTag.keypress(enterMsg);

    $(TAG_TD).click(selectCell);

    $(TAG_TH).click(selectTuple);
}); // END ON READY ===========================================================


// Selects a cell when clicked on
// ============================================================================
function selectCell() {
    deselectAll();
    currCell = $(this);

    savedVal = $(this).text();
    $inputTag.val(savedVal);

    currCell.html($inputTag);
    $inputTag.focus();
    $inputTag.select();
} // end selectCell() =========================================================


// Selects the cells in a row or column when a table header is clicked on
// ============================================================================
function selectTuple() {
    deselectAll();

    var ind = $(this).index();
    if (ind == 0) {
        if ($(this).closest(TAG_TR).index() != 0) {
            $(this).siblings().toggleClass(CLASS_SELECT);
        }
    } else {
        $(TAG_TR + " " + TAG_TD + ":nth-of-type(" + ind + ")")
            .toggleClass(CLASS_SELECT);
    }
} // end selectTuple() =========================================================


// Deselects all cells that are selected
// ============================================================================
function deselectAll() {
    $("." + CLASS_SELECT).toggleClass(CLASS_SELECT);

    if (currCell != "") {
        currCell.html(savedVal);
    }
} // end deselectAll() ========================================================


// Handles entering a new value in a selected cell
// ============================================================================
function enterMsg(e) {
    if (e.keyCode === 13) {
        currCell.html($inputTag.val());
        currCell = "";
    }
} // end enterMsg(e) ==========================================================