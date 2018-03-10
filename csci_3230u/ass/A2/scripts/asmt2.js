;
// Constants
// ============================================================================
// Globals
// ============================================================================
// ============================================================================
// ON READY
// ============================================================================
$(document).ready(function () {
    $("#goButton").click(extractCoords);
}); // END ON READY ===========================================================

// Extract Coordinates from input
// ============================================================================
function extractCoords() {
    var lon = $("#lon").val(),
        lat = $("#lat").val();
    downloadWeather(lon, lat);
    downloadForecast(lon, lat);
    showMap(lon, lat);
}

function downloadWeather(lon, lat) {
    var url = "http://api.apixu.com/v1/forecast.json?q=" + lat + "," + lon + "&key=" + KEY_WEATHER;

    var temp = $(document.createElement("div")).attr("id", "temperature");
    var cond = $(document.createElement("div")).attr("id", "condition");
    var wind = $(document.createElement("div")).attr("id", "wind");
    $("#weather")
        .html("")
        .append(temp)
        .append(cond)
        .append(wind);

    addElem(temp, "h2", "", "Temperature", "");
    addElem(cond, "h2", "", "Condition", "");
    addElem(wind, "h2", "", "Wind", "");

    $.getJSON(url, function (data) {
        addElem(temp, "p", "Current", data.current.temp_c, "°C");
        addElem(temp, "p", "Feels like", data.current.feelslike_c, "°C");
        addElem(cond, "p", "", data.current.condition.text, "");
        addElem(cond, "p", "Cloud cover", data.current.cloud, "%");
        addElem(cond, "p", "Humidity", data.current.humidity, "%");
        addElem(cond, "p", "Pressure", data.current.pressure_mb, "mB");
        addElem(wind, "p", "Direction", data.current.wind_dir, "°");
        addElem(wind, "p", "Speed", data.current.wind_kph, "°km/h");
    });
}
function downloadForecast(lon, lat) {
    var url = "http://api.apixu.com/v1/forecast.json?q=" + lat + "," + lon + "&days=7&key=" + KEY_WEATHER;
    var tr;
    var table = $(document.createElement("table"))
        .append("<thead><tr>")
        .append("<tbody>");
    $("#forecast")
        .html("")
        .append(table);

    addElem("tr", "th", "", "Date", "");
    addElem("tr", "th", "", "Condition", "");
    addElem("tr", "th", "", "High", "");
    addElem("tr", "th", "", "Low", "");
    addElem("tr", "th", "", "Wind", "");
    addElem("tr", "th", "", "Outlook", "");

    $.getJSON(url, function (data) {

        for (var i = 0; i < 7; i++) {
            tr = $(document.createElement("tr"));
            $("tbody").append(tr);

            addElem(tr, "td", "", data.forecast.forecastday[i].date, "");

            tr.append($(document.createElement("img")).attr("src", data.forecast.forecastday[i].day.condition.icon));

            addElem(tr, "td", "", data.forecast.forecastday[i].day.maxtemp_c, "");
            addElem(tr, "td", "", data.forecast.forecastday[i].day.mintemp_c, "");
            addElem(tr, "td", "", data.forecast.forecastday[i].day.maxwind_kph, "");
            addElem(tr, "td", "", data.forecast.forecastday[i].day.condition.text, "");
        };
    });

}

function showMap(lon, lat) {}

function addElem(parent, tag, key, value, unit) {

    if (key != "") {
        key += ": ";
    }
    $(parent).append($(document.createElement(tag)).html(key + value + unit));
}
