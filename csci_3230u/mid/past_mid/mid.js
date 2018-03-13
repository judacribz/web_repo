;
$(document).ready(function () {
    $("tbody tr").click(displayStudentData);

    $("#update").click(updateData);
    $("#add").click(addData);
});

function displayStudentData() {
    var tds = $(this).children();

    $("#sid").val($(tds[0]).text());
    $("#firstName").val($(tds[1]).text());
    $("#lastName").val($(tds[2]).text());
    $("#grade").val($(tds[3]).text());
}

function updateData() {
    if ($("#sid").val() && $("#firstName").val() && $("#lastName").val() && $("#grade").val()) {
        var tds = $("tbody tr td:contains('" + $("#sid").val() + "')").siblings();

        $(tds[0]).text($("#firstName").val());
        $(tds[1]).text($("#lastName").val());
        $(tds[2]).text($("#grade").val());
    }
}

function addData() {
    var sid = $("#sid").val();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var grade = $("#grade").val();

    if ($("#sid").val() && $("#firstName").val() && $("#lastName").val() && $("#grade").val()) {
        var tds = $("tbody tr td:contains('" + $("#sid").val() + "')");

        if (tds.length == 0) {
            var tr = document.createElement("tr");

            $(tr)
                .append("<td>" + sid, "<td>" + firstName, "<td>" + lastName, "<td>" + grade)
                .click(displayStudentData);;
            $("tbody").append($(tr));
        }
    }
}