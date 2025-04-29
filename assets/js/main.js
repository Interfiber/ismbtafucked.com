(async () => {
    let provider = new MBTADataProvider();

    await loadSubwayData(provider, document.querySelector("#subway-data"));
    await loadCommuterRailData(provider, document.querySelector("#cr-data"));
})();