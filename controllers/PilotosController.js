var PilotosController = (function () {
    function PilotosController($scope, clasificacionMundial) {
        this.$scope = $scope;
        this.nameFilter = "";
        console.debug('hace watch???');
        $scope.vm = this;
        this.driversList = clasificacionMundial;
    }
    PilotosController.$inject = ["$scope", "clasificacionMundial"];
    return PilotosController;
}());
//# sourceMappingURL=PilotosController.js.map