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
        var currData = data.current;

        addElem(temp, "p", "Current", currData.temp_c, "°C");
        addElem(temp, "p", "Feels like", currData.feelslike_c, "°C");
        addElem(cond, "p", "", currData.condition.text, "");
        addElem(cond, "p", "Cloud cover", currData.cloud, "%");
        addElem(cond, "p", "Humidity", currData.humidity, "%");
        addElem(cond, "p", "Pressure", currData.pressure_mb, "mB");
        addElem(wind, "p", "Direction", currData.wind_dir, "°");
        addElem(wind, "p", "Speed", currData.wind_kph, "°km/h");
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
        var forecast,
            forecastDay,
            forecastCond;

        for (var i = 0; i < 7; i++) {
            forecast = data.forecast.forecastday[i];
            forecastDay = forecast.day;
            forecastCond = forecastDay.condition;

            tr = $(document.createElement("tr"));
            $("tbody").append(tr);

            addElem(tr, "td", "", forecast.date, "");

            tr.append($(document.createElement("img")).attr("src", forecastCond.icon));
            addElem(tr, "td", "", forecastDay.maxtemp_c, "");
            addElem(tr, "td", "", forecastDay.mintemp_c, "");
            addElem(tr, "td", "", forecastDay.maxwind_kph, "");
            addElem(tr, "td", "", forecastCond.text, "");
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
