var Visualizer = window["ui-router-visualizer"].Visualizer;
var app = angular.module("myApp", ["ui.router"]);
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
    function ($urlRouterProvider, $stateProvider) {
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
                    function (ergastService) { return ergastService.getDrivers(); }
                ],
                circuitosMundial: [
                    "ergastService",
                    function (ergastService) { return ergastService.getCircuitos(); }
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
                pilotoId: ["$stateParams", function ($stateParams) { return $stateParams.id; }],
                piloto: [
                    "clasificacionMundial",
                    "pilotoId",
                    function (clasificacionMundial, pilotoId) {
                        return clasificacionMundial.find(function (clasificacion) { return clasificacion.Driver.driverId == pilotoId; });
                    }
                ],
                carreras: [
                    "ergastService",
                    "pilotoId",
                    function (ergastService, pilotoId) { return ergastService.getDriverRaces(pilotoId); }
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
                    function (ergastService) { return ergastService.getCircuitos(); }
                ]
            }
        })
            .state("app.circuito", {
            url: "/circuito/:id",
            templateUrl: "views/circuitoDetalle.html",
            controller: CircuitoDetalleController,
            resolve: {
                circuitoId: ["$stateParams", function ($stateParams) { return $stateParams.id; }],
                circuito: [
                    "circuitosMundial",
                    "circuitoId",
                    function (circuitosMundial, circuitoId) {
                        return circuitosMundial.filter(function (circuito) { return circuito.circuitId == circuitoId; });
                    }
                ]
            }
        });
    }
]);
app.run([
    "$uiRouter",
    function ($uiRouter) {
        var pluginInstance = $uiRouter.plugin(Visualizer);
    }
]);
//# sourceMappingURL=app.js.map