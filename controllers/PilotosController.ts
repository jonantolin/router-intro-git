interface IPilotosControllerScope extends ng.IScope {
  vm: PilotosController;
}
class PilotosController implements ng.IController {
  public driversList = [];
  public nameFilter: string = "";

  public static $inject = ["$scope", "clasificacionMundial"];

  constructor(private $scope: IPilotosControllerScope, clasificacionMundial: any) {
    
    console.debug('hace watch???');
    $scope.vm = this;
    this.driversList = clasificacionMundial;
  }
}
