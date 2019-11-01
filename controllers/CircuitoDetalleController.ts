interface ICircuitoDetalleControllerScope extends ng.IScope {
    vm: CircuitoDetalleController;
  }
  class CircuitoDetalleController implements ng.IController {

    public titulo: string; 
    public circuito: ICircuito;

    public static $inject = ["$scope", "circuito"];
  
    constructor(private $scope: ICircuitoDetalleControllerScope, circuito: ICircuito) {
      
      console.debug('CircuitoDetalleController constructor');
      $scope.vm = this;
      $scope.vm.circuito = circuito[0];

    }
  }