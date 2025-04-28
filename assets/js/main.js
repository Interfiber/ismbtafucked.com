(async () => {
    let provider = new MBTADataProvider();

    loadSubwayData(provider, document.querySelector("#subway-data"));
})();