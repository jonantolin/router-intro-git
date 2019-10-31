interface IPilotosControllerScope extends ng.IScope {
  vm: PilotosController;
}
class PilotosController implements ng.IController {
  public driversList: Array<IDriverStandings> = [];
  public nameFilter: string = "";

  public static $inject = ["$scope", "clasificacionMundial"];

  constructor(private $scope: IPilotosControllerScope, clasificacionMundial: Array<IDriverStandings>) {
    
    console.log('IPilotosControllerScope constructor');
    $scope.vm = this;
    this.driversList = clasificacionMundial;

  }
}
