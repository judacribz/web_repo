;
const DIV_STORIES = "#topStories";
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
            title = getText(entries[i],TAG_TITLE);
            date = getText(entries[i], TAG_DATE);
            summary = getText(entries[i], TAG_SUMMARY);
            content = getText(entries[i], TAG_CONTENT);

            head = $(document.createElement("div")).append("<h2>" + title, "<h4>" + date, "<div>" + summary);
            body = $(document.createElement("div")).append("<hr/>", content);

            $(DIV_STORIES).append($(document.createElement("div")).addClass("story").append(head,  body));
        }

        $(".story").accordion({
            collapsible: true,
        });

        $(".story:not(:nth-of-type(1))").accordion('option', {
            active: false
        });
    });
});

function getText(elem, tagName) {
    return elem.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;;
}