;
// Constants
// ============================================================================
const TABLE_SUBS = [
    "Date",
    "Condition",
    "High",
    "Low",
    "Wind",
    "Outlook"
];

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
        .addClass("display")
        .append(temp)
        .append(cond)
        .append(wind);

    addElem(temp, "h2", "", "Temperature", "");
    addElem(cond, "h2", "", "Condition", "");
    addElem(wind, "h2", "", "Wind", "");

    $.getJSON(url, function (data) {
        var currData = data.current;
        var foreDay = data.forecast.forecastday[0].day;

        addElem(temp, "p", "Current", currData.temp_c, "°C");
        addElem(temp, "p", "Low", foreDay.maxtemp_c, "°C");
        addElem(temp, "p", "High", foreDay.mintemp_c, "°C");
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
        .attr({class: "table"})
        .append("<thead><tr>")
        .append("<tbody>");

    $("#forecast")
        .html("")
        .append("<h2>Forecast")
        .append(table);

    TABLE_SUBS.forEach(function (tableSubs) {
        addElem("tr", "th", "", tableSubs, "");
    });

    $.getJSON(url, function (data) {
        var forecast,
            forecastDay,
            forecastCond,
            forecastAttrs = [];

        for (var i = 0; i < 7; i++) {
            forecast = data.forecast.forecastday[i];
            forecastDay = forecast.day;
            forecastCond = forecastDay.condition;

            forecastAttrs = [
                forecast.date,
                $(document.createElement("img")).attr({
                    src: "imgs/" + forecastCond.icon.split('/')[6],
                    alt: forecastCond.text
                }),
                forecastDay.maxtemp_c,
                forecastDay.mintemp_c,
                forecastDay.maxwind_kph,
                forecastCond.text
            ];

            tr = $(document.createElement("tr"));
            $("tbody").append(tr);

            forecastAttrs.forEach(function (forecastAttr) {
                addElem(tr, "td", "", forecastAttr, "");
            });
        };
    });
}

function showMap(lon, lat) {
    var coords = {
        lat: parseFloat(lat),
        lng: parseFloat(lon)
    };

    var map = new google
        .maps
        .Map(document.getElementById("map-canvas"), {
            zoom: 16,
            center: coords
        });

    var marker = new google
        .maps
        .Marker({position: coords, map: map});
}

function addElem(parent, tag, key, value, unit) {
    var htmlPart;

    if (key != "") {
        key += ": ";
        htmlPart = key + value + unit;
    } else {
        htmlPart = value;
    }

    $(parent).append($(document.createElement(tag)).append(htmlPart));
}