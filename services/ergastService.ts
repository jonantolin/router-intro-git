


interface IErgastService {
  /**
   * Peticion GET a servicio REST
   * @return Promesa con array de IDriverStandings
   */
  getDrivers(): angular.IPromise<IDriverStandings[]>;


  /**
   * Peticion GET a servicio REST
   * @return Promesa con un IDriverStandings
   */
  getDriverDetails(id: string): angular.IPromise<IDriverStandings>;


  /**
   * Peticion GET a servicio REST
   * @return Promesa con array de IRace
   */
  getDriverRaces(id: string): angular.IPromise<IRace[]>;

  /**
   * Peticion GET a servicio REST
   * @return Promesa con array de ICircuito
   */
  getCircuitos(): angular.IPromise<ICircuito[]>;
}

class ErgastService implements IErgastService {

  
  private http: ng.IHttpService;

  constructor($http) {
    this.http = $http;
  }

  public getDrivers = () => {
    return this.http.get<any>("http://ergast.com/api/f1/2017/driverStandings.json").then(result => {
      return result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
  }

  public getDriverDetails = id => {
    return this.http
      .get<any>("http://ergast.com/api/f1/2017/drivers/" + id + "/driverStandings.json")
      .then(response => {
        return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
      });
  }

  public getCircuitos = () => {
    let url = 'http://ergast.com/api/f1/circuits.json';
    console.log("ErgastService getCirccuitos");

    return this.http.get(url).then(
      (response) => {
        console.debug('llamada correcta %o', response.data['MRData'].CircuitTable.Circuits);
        let dataJson = response.data['MRData'].CircuitTable.Circuits;
        return dataJson;
      }
    );

  } // end getCircuitos

  public getDriverRaces = id => {
    return this.http
      .get<any>("http://ergast.com/api/f1/2017/drivers/" + id + "/results.json")
      .then(response => {
        return response.data.MRData.RaceTable.Races;
      });
  }

}
