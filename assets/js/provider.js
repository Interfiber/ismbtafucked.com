class MBTADataProvider {
    constructor() {
        /**
         * Root URL for all API requests
         * @type {string}
         * @public
         */
        this.rootURL = "https://api-v3.mbta.com";
    }

    /**
     * Make an HTTP request to the MBTA api
     * @param {string} url 
     */
    async makeHttp(url) {
        return await fetch(`${this.rootURL}/${url}`, {
            method: "GET"
        });
    }

    /**
     * Get alerts matching the given filter string
     * @param {string} filter 
     */
    async getAlerts(filter) {
        let data = await this.makeHttp(`alerts?${filter}`);

        return await data.json();
    }
};