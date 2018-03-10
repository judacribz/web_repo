// ============================================================================
// ON READY
// ============================================================================
$(document).ready(function () {
    $("#genTableButton").click(displayStudentData);
});


function displayStudentData() {
    var numAsmts = 0;
    var grades;
    var thSet = false;

    $(this).prop('disabled', true);

    $("#content").html("<table><tr><th>Student ID</th></tr></table>");

    $.get("student_data.csv", function (studentData) {
        $.each(studentData.split('\n'), function (_, studentGrades) {
            grades = studentGrades.split(',');
            numAsmts = grades.length;

            if (!thSet) {
                for (var i = 1; i < numAsmts; i++) {
                    $(TAG_TR).append("<th>");
                    $("th:nth-last-of-type(1)").text("Asmt " + i).click(selectTuple);
                }
                thSet = true;
            }

            $(TAG_TABLE).append("<tr><th>" + grades[0] + "</th></tr>")
            $("tr:nth-last-of-type(1) th").click(selectTuple);

            for (var i = 1; i < numAsmts; i++) {
                $("tr:nth-last-of-type(1)").append("<td>" + parseFloat(grades[i]) + "</td>");
                $("td:nth-last-of-type(1)").click(selectCell);
            }
        });
    });
}