var ErgastService = (function () {
    function ErgastService($http) {
        var _this = this;
        this.getDrivers = function () {
            return _this.http.get("http://ergast.com/api/f1/2017/driverStandings.json").then(function (result) {
                return result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            });
        };
        this.getDriverDetails = function (id) {
            return _this.http
                .get("http://ergast.com/api/f1/2017/drivers/" + id + "/driverStandings.json")
                .then(function (response) {
                return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
            });
        };
        this.getCircuitos = function () {
            var url = 'http://ergast.com/api/f1/circuits.json';
            console.log("ErgastService getCirccuitos");
            return _this.http.get(url).then(function (response) {
                console.debug('llamada correcta %o', response.data['MRData'].CircuitTable.Circuits);
                var dataJson = response.data['MRData'].CircuitTable.Circuits;
                return dataJson;
            });
        };
        this.getDriverRaces = function (id) {
            return _this.http
                .get("http://ergast.com/api/f1/2017/drivers/" + id + "/results.json")
                .then(function (response) {
                return response.data.MRData.RaceTable.Races;
            });
        };
        this.http = $http;
    }
    return ErgastService;
}());
//# sourceMappingURL=ergastService.js.map