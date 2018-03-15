// ============================================================================
// ON READY
// ============================================================================;
var jsonFile = "http://csundergrad.science.uoit.ca/courses/csci3230u/mtle/quiz_questions.json";
var index = 0;
$(document).ready(function () {
    $("#nextButton")
        .click(handleNext)
        .hide();

    $("#beginButton").click(handleBegin);
    getJsonData();
});

var qs = [];
var ans = [];
var corr = [];
function getJsonData() {

    $
        .getJSON(jsonFile, function (data) {
            var numQs = data.questions.length;
            var q;
            for (var i = 0; i < numQs; i++) {
                q = data.questions[i];
                qs.push(q.question);
                ans.push(q.answers);
                corr.push(ans[i][q.correctAnswerIndex]);
            }
        });
}

function handleBegin() {
    $(this).hide();
    $("#nextButton").show();
    loadQuest();
}

function handleNext() {

    showInTable();
    if (index == qs.length) {
        $(this).hide();

        $("#question").html("");
        $("#answers").html("");
    } else {
        loadQuest();
    }
}

function loadQuest() {
    $("#question").html("");
    $("#answers").html("");

    $("#question").append(qs[index]);
    ans[index].forEach(function (a) {
        $("#answers").append($(document.createElement("a")).addClass("list-group-item").text(a).click(selectAns));
    });

    index++;
}
var choice;
var curr;
function selectAns() {
    deselectAll();
    choice = $(this).text();
    curr = this;
    $(this).css("background-color", "lightBlue");
}

function showInTable() {
    var tr = document.createElement("tr");
    var className;
    if (corr[index - 1] == choice) {
        className = "table-success";
    } else {
        className = "table-danger";
    }
    $(tr).toggleClass(className);
    $(tr).append("<td>" + index, "<td>" + qs[index - 1], "<td>" + choice, "<td>" + corr[index - 1]);
    $("#resultsBody").append($(tr));
}

function deselectAll() {
    $(curr).css("background-color", "white");
}