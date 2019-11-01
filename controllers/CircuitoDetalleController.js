var CircuitoDetalleController = (function () {
    function CircuitoDetalleController($scope, circuito) {
        this.$scope = $scope;
        console.debug('CircuitoDetalleController constructor');
        $scope.vm = this;
        $scope.vm.circuito = circuito[0];
    }
    CircuitoDetalleController.$inject = ["$scope", "circuito"];
    return CircuitoDetalleController;
}());
//# sourceMappingURL=CircuitoDetalleController.js.map