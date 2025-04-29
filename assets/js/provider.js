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
        let res = await fetch(`${this.rootURL}/${url}`, {
            method: "GET"
        });

        if (res.status != 200) {
            throw new Error(`Failed to make HTTP request to ${url} got HTTP ${res.status}: ${res.statusText}`)
        }

        return res;
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