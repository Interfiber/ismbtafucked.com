/**
 * Load subway data/status, wrapper over loadRouteData
 * @param {MBTADataProvider} provider 
 * @param {HTMLElement} element
 */
async function loadSubwayData(provider, element) {
    element.innerHTML = await loadRouteData(provider, SUBWAY_ROUTES, SUBWAY_ROUTES_NAMES);
}

/**
 * Load commuter rail data/status, wrapper over loadRouteData
 * @param {MBTADataProvider} provider 
 * @param {HTMLElement} element
 */
async function loadCommuterRailData(provider, element) {
    element.innerHTML = await loadRouteData(provider, COMMUTER_RAIL_ROUTES, COMMUTER_RAIL_ROUTES_NAMES);
}