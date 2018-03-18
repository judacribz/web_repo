;
const DIV_NEWS = "#topStories";
const DATA_FILE = "data/topstories.atom";
const TAG_ENTRY = "entry";
const TAG_TITLE = "title";
const TAG_DATE = "updated";
const TAG_SUMMARY = "summary";
const TAG_CONTENT = "content";

$(document).ready(function () {

    $.get(DATA_FILE, (studentData) => {
        var entries = studentData.getElementsByTagName(TAG_ENTRY);
        var title,
            date,
            summary,
            content,
            head,
            body;

        for (var i = 0; i < entries.length; i++) {
            title = entries[0].getElementsByTagName(TAG_TITLE)[0].childNodes[0].nodeValue;
            date = entries[0].getElementsByTagName(TAG_DATE)[0].childNodes[0].nodeValue;
            summary = entries[0].getElementsByTagName(TAG_SUMMARY)[0].childNodes[0].nodeValue;
            content = entries[0].getElementsByTagName(TAG_CONTENT)[0].childNodes[0].nodeValue;

            head = $(document.createElement("div")).append("<h2>" + title, "<h4>" + date, "<div>" + summary);
            body = $(document.createElement("div")).append("<h2>" + content);

            $(DIV_NEWS).append(head, body);
        }
        $(DIV_NEWS).accordion();
    });
});

function getText(elem) {
    elem.childNodes[0].nodeValue;
}