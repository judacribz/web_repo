const CLASS_SELECT = "selected";
const TAG_TD = "td";
const TAG_TH = "th";
const TAG_TR = "tr";
var currCell = "";
var inputTag;
var savedVal;

$(document).ready(function () {
    var tdElems = $(TAG_TD).get();
    var ths = $(TAG_TH).get();
    var ind = -1;

    inputTag = document.createElement('input');
    inputTag.setAttribute('onkeypress', "enterMsg(event)");
    inputTag.setAttribute('type', 'number');

    $(TAG_TD).click(function () {
        deselectAll();
        currCell = $(this);

        savedVal = $(this).text();
        inputTag.setAttribute('lastValue', "'" + savedVal + "'");
        inputTag.value = savedVal;

        currCell.html("");
        currCell.append(inputTag);
        inputTag.focus();
        inputTag.select();
    });

    $(TAG_TH).click(function () {
        deselectAll();

        ind = $(this).index();
        if (ind == 0) {
            if ($(this).closest(TAG_TR).index() != 0) {
                $(this).siblings().toggleClass(CLASS_SELECT);
            }
        } else {
            $(TAG_TR + " " + TAG_TD + ":nth-of-type(" + ind + ")").toggleClass(CLASS_SELECT);
        }
    });
});

function deselectAll() {
    $("." + CLASS_SELECT).toggleClass(CLASS_SELECT);

    if (currCell != "") {
        currCell.html(savedVal);
    }
}

function enterMsg(e) {
    if (e.keyCode === 13) {
        currCell.html(inputTag.value);
        currCell = "";
    }
}