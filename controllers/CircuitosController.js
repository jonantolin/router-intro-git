var CircuitosController = (function () {
    function CircuitosController($scope, circuitosMundial) {
        this.$scope = $scope;
        this.circuitos = Array();
        this.marcasMapa = [];
        console.debug('CircuitosController constructor');
        $scope.vm = this;
        $scope.vm.titulo = "Circuitos";
        $scope.vm.circuitos = circuitosMundial;
        $scope.vm.marcasMapa = circuitosMundial.map(function (circuito) {
            return { "ciudad": circuito.circuitName, "lat": circuito.Location.lat, "long": circuito.Location.long };
        });
        console.debug('fin constructor CircuitosController');
    }
    CircuitosController.$inject = ["$scope", "circuitosMundial"];
    return CircuitosController;
}());
//# sourceMappingURL=CircuitosController.js.map