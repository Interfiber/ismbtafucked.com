/**
 * Convert an array to a filter list
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
 * Load route data for the given list of routes
 * @param {Array<string>} routes
 * @param {Array<string>} readable
 */
async function loadRouteData(provider, routes, readable) {
    let alertData = await provider.getAlerts(`${arrayToFilter('filter[route]', routes)}`);
    let alerts = alertData["data"];

    let perRouteStats = new Map();
    let perRouteAlerts = new Map();

    for (var i = 0; i < alerts.length; i++) {
        let alert = alerts[i];
        let attrs = alert["attributes"];
        let informed = attrs["informed_entity"];

        if (informed.length == 0) continue;
        if (attrs["lifecycle"] != "NEW" && attrs["lifecycle"] != "ONGOING") continue;

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
        } else if (cause == "SERVICE_CHANGE") {
            severity = 4;
        } else {
            console.warn(`${cause} has no severity value`);
        }

        if (severity == 0) continue;

        console.log(`${cause} = ${severity}`);

        if (perRouteStats.has(route)) {
            perRouteStats.set(route, perRouteStats.get(route) + severity)
            perRouteAlerts.get(route).push(attrs["short_header"]);
        } else {
            perRouteStats.set(route, severity);
            perRouteAlerts.set(route, [attrs["short_header"]]);
        }
    }

    let final = "";
    for (let routeI in routes) {
        let route = routes[routeI];
        let name = readable[routeI];

        if (!perRouteStats.has(route)) {
            final += `<p></p><div class="alert alert-success" role="alert">
        <h4 class="alert-heading">The ${name} line is not fucked 😀</h4>
        </div><p></p>\n`;

            continue;
        }

        let finalRouteAlerts = "<ul>";

        for (let alertI of perRouteAlerts.get(route)) {
            finalRouteAlerts += `<li>${alertI}</li>`;
        }
        finalRouteAlerts += "</ul>";

        let score = perRouteStats.get(route);
        let fucked = scoreToFuckedness(score);

        let cssClass = "alert-success";
        let emoji = "";

        if (fucked == Fuckedness.ALittleFucked) {
            cssClass = "alert-secondary";
            emoji = "😐";
        } else if (fucked == Fuckedness.Fucked) {
            cssClass = "alert-warning";
            emoji = "😞";
        } else if (fucked == Fuckedness.TurboFucked) {
            cssClass = "alert-danger";
            emoji = "😡";
        }

        final += `<p></p><div class="alert ${cssClass}" role="alert">
        <h4 class="alert-heading">The ${name} line is ${fucked} ${emoji}</h4>
        <p>${finalRouteAlerts}</p>
        <hr>
        <p class="mb-0">See <a href="https://mbta.com/schedules/${route}">this</a> for official information</p>
        </div><p></p>\n`;
        if (score == 0) continue;
    }

    return final;
}