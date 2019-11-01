let Visualizer = window["ui-router-visualizer"].Visualizer;
const app = angular.module("myApp", ["ui.router"]);

app
  .service("ergastService", ErgastService)
  .controller("pilotosController", PilotosController)
  .controller("pilotoCarrerasController", PilotoCarrerasController)
  .controller("pilotoDetalleController", PilotoDetalleController)
  .controller("pilotoController", PilotoController)
  .controller("circuitosController", CircuitosController)
  .controller("circuitoDetalleController", CircuitoDetalleController);

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
          ],
          circuitosMundial:[
            "ergastService",
            (ergastService: IErgastService) => ergastService.getCircuitos()
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
      .state("app.circuitos", {
        url: "/circuitos",
        templateUrl: "views/circuitos.html",
        controller: CircuitosController,
        resolve: {
          circuitosMundial: [
            "ergastService",
            (ergastService: IErgastService) => ergastService.getCircuitos()
          ]
        }
      })
      .state("app.circuito", {
        url: "/circuito/:id",
        templateUrl: "views/circuitoDetalle.html",
        controller: CircuitoDetalleController,
        resolve: {
          circuitoId: ["$stateParams", ($stateParams: angular.ui.IStateParamsService) => $stateParams.id],
          circuito: [
            "circuitosMundial",
            "circuitoId",
            (circuitosMundial: any, circuitoId: string) => 
              circuitosMundial.filter(circuito => circuito.circuitId == circuitoId)
          ]
        }
      })
      /*
      .state("app.circuito.detalle", {
        url: "circuito/:id",
        templateUrl: "views/circuitoDetalle.html",
        controller: CircuitoDetalleController



      })*/;
  }
]);

app.run([
  "$uiRouter",
  $uiRouter => {
    const pluginInstance = $uiRouter.plugin(Visualizer);
  }
]);
