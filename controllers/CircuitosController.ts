interface ICircuitosControllerScope extends ng.IScope {
  vm: CircuitosController;
}
class CircuitosController implements ng.IController {

  //public driversList = [];
  //public nameFilter: string = "";

  public titulo: string;
  public circuitos: Array<ICircuito> = [];
  public marcasMapa = [];

  public static $inject = ["$scope", "circuitosMundial"];

  constructor(private $scope: ICircuitosControllerScope, circuitosMundial: Array<ICircuito>) {
    
    console.debug('CircuitosController constructor');
    $scope.vm = this;
    $scope.vm.titulo = "Circuitos";
    $scope.vm.circuitos = circuitosMundial;

    $scope.vm.marcasMapa = circuitosMundial.map(circuito => {
      return  {"ciudad":circuito.circuitName ,"lat":circuito.Location.lat, "long":circuito.Location.long}
    });
    //this.driversList = clasificacionMundial;

    console.debug('fin constructor CircuitosController');
  }
}