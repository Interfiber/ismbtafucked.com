const SUBWAY_ROUTES = [
    "Red",
    "Orange",
    "Blue",
    "Green-B",
    "Green-C",
    "Green-D",
    "Green-E"
];

/**
 * 
 * @param {string} filter
 * @param {Array} array 
 */
function arrayToFilter(filter, array) {
    let final = `${filter}=`;

    for (let i = 0; i < array.length; i++) {
        final += `${array[i]}`;
        if (i != array.length) final += ',';
    }

    return final;
}

/**
 * Load subway alerts 
 * Unlike the commuter rail we measure fuckedness by the amount of active service alerts a line has
 * This includes shutdowns, but they contribute less to the fucked counter since they are planned
 * See docs/README.md for more info
 * @param {MBTADataProvider} provider 
 * @param {HTMLElement} element
 */
async function loadSubwayData(provider, element) {
    let alertData = await provider.getAlerts(`${arrayToFilter('filter[route]', SUBWAY_ROUTES)}`);
    let alerts = alertData["data"];

    let perRouteStats = new Map();
    let perRouteAlerts = new Map();

    for (let i = 0; i < alerts.length; i++) {
        let alert = alerts[i];
        let attrs = alert["attributes"];
        let informed = attrs["informed_entity"];

        if (informed.length == 0) continue;
        if (attrs["lifecycle"] != "NEW") continue;

        let route = informed[0]["route"];

        let severity = 0;
        let cause = attrs["effect"];

        if (cause == "DELAY") {
            severity = 3;
        } else if (cause == "SUSPENSION") {
            severity = 4;
        } else if (cause == "STOP_CLOSURE" || cause == "STATION_CLOSURE") {
            severity = 4;
        } else if (cause == "SHUTTLE") {
            severity = 4;
        } else if (cause == "DETOUR") {
            severity = 3;
        } else if (cause == "CANCELLATION") {
            severity = 5;
        } else {
            console.warn(`${cause} has no severity value`);
        }

        console.log(`${cause} = ${severity}`);

        if (perRouteStats.has(route)) {
            perRouteStats.get(route) += severity;
            perRouteAlerts.get(route).push(attrs["short_header"]);
        } else {
            perRouteStats.set(route, severity);
            perRouteAlerts.set(route, [attrs["short_header"]]);
        }
    }

    let final = "";
    perRouteStats.forEach((value, key) => {
        let finalRouteAlerts = "<ul>";

        perRouteAlerts.get(key).forEach(key => {
            finalRouteAlerts += `<li>${key}</li>`;
        });
        finalRouteAlerts += "</ul>";

        final += `<h3>The ${key} line is ${scoreToFuckedness(value)}</h3>\n`;
        final += `${finalRouteAlerts}`;
        console.log(perRouteAlerts);
    });

    element.innerHTML = final;
}