// Constants
// ============================================================================
const CLASS_SELECT = "selected";
const TAG_TD = "td";
const TAG_TR = "tr";
const TAG_TABLE = "table";
const TAG_INPUT = "<input/>";

const $ELEM_INP = $(TAG_INPUT).attr("type", "number");

// Globals
// ============================================================================
var currCell = "";
var savedVal;
var $inputTag = $ELEM_INP;

// Selects a cell when clicked on
// ============================================================================
function selectCell() {
    deselectAll();
    currCell = $(this);
    savedVal = currCell.text();

    // $inputTag = $ELEM_INP;
    $inputTag.keypress(enterMsg).val(savedVal);

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