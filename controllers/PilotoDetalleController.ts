interface IPilotoControllerScope extends angular.IScope {
  vm: PilotoDetalleController;
}

class PilotoDetalleController implements ng.IController {
  public vm: PilotoDetalleController;
  public driver: IDriverStandings;
  public static $inject = ["$scope", "piloto"];
  constructor(private $scope: IPilotoControllerScope, piloto: IDriverStandings) {
    $scope.vm = this;
    this.driver = piloto;
  }
}
