interface IPilotoCarrerasScope extends angular.IScope {
  vm: PilotoCarrerasController;
}

class PilotoCarrerasController implements ng.IController {
  public vm: PilotoCarrerasController;
  public races: Array<IRace> = [];
  public static $inject = ["$scope", "carreras"];
  constructor(private $scope: IPilotoCarrerasScope, carreras: Array<IRace>) {
    $scope.vm = this;
    this.races = carreras;
  }
}
