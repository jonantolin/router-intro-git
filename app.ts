let Visualizer = window["ui-router-visualizer"].Visualizer;
const app = angular.module("myApp", ["ui.router"]);

app
  .service("ergastService", ErgastService)
  .controller("pilotosController", PilotosController)
  .controller("pilotoCarrerasController", PilotoCarrerasController)
  .controller("pilotoDetalleController", PilotoDetalleController)
  .controller("pilotoController", PilotoController)
  .controller("circuitosController", CircuitosController);

app.config([
  "$urlRouterProvider",
  "$stateProvider",
  ($urlRouterProvider: angular.ui.IUrlRouterProvider, $stateProvider: angular.ui.IStateProvider) => {
    console.log("Entrando en la configuracion");

    $urlRouterProvider.when("", "/app/pilotos");
    $stateProvider
      .state("app", {
        url: "/app",
        abstract: true,
        template: "<div ui-view></div>",
        resolve: {
          clasificacionMundial: [
            "ergastService",
            (ergastService: IErgastService) => ergastService.getDrivers()
          ]
        }
      })
      .state("app.lista", {
        url: "/pilotos",
        templateUrl: "views/pilotos.html",
        controller: PilotosController
      })
      .state("app.piloto", {
        url: "/piloto/:id",
        templateUrl: "views/piloto.html",
        controller: "pilotoController",
        resolve: {
          pilotoId: ["$stateParams", ($stateParams: angular.ui.IStateParamsService) => $stateParams.id],
          piloto: [
            "clasificacionMundial",
            "pilotoId",
            (clasificacionMundial: any, pilotoId: string) =>
              clasificacionMundial.find(clasificacion => clasificacion.Driver.driverId == pilotoId)
          ],
          carreras: [
            "ergastService",
            "pilotoId",
            (ergastService: IErgastService, pilotoId: string) => ergastService.getDriverRaces(pilotoId)
          ]
        }
      })

      .state("app.piloto.detalle", {
        url: "/detalle",
        templateUrl: "views/pilotoDetalle.html",
        controller: "pilotoDetalleController",
        params: { id: null }
      })
      .state("app.piloto.carreras", {
        url: "/carreras",
        templateUrl: "views/pilotoCarreras.html",
        controller: "pilotoCarrerasController",
        params: { id: null }
      })
      .state("app.leeme", {
        url: "/leeme",
        templateUrl: "views/leeme.html"
        
      })
      .state("app.circuito", {
        url: "/circuitos",
        templateUrl: "views/circuitos.html",
        controller: CircuitosController,
        resolve: {
          circuitosMundial: [
            "ergastService",
            (ergastService: IErgastService) => ergastService.getCircuitos()
          ]
        }
      });
  }
]);

app.run([
  "$uiRouter",
  $uiRouter => {
    const pluginInstance = $uiRouter.plugin(Visualizer);
  }
]);
