/*
 *   ATENCION: las vueltas de los servicios están sin tipar (todos los servicios devuelven any)
 *   Se deben crear los interfaces necesarios a partir de la documentacion de ergast
 */

interface ILocation{
  country: string;
  lat: string;
  locality: string;
  long: string;
} 


interface ICircuito{
  Location: ILocation;
  circuitId: string;
  circuitName: string;
  url: string;
}



interface IDriver{
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}


interface IConstructors{
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

interface IDriverStandings{
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: IDriver;
  Constructors: Array<IConstructors>;
}


/*
"Races":[ 
{ 
    "season":"2017",
    "round":"1",
    "url":"https:\/\/en.wikipedia.org\/wiki\/2017_Australian_Grand_Prix",
    "raceName":"Australian Grand Prix",
    "Circuit":{  },
    "date":"2017-03-26",
    "time":"05:00:00Z",
    "Results":[ 
      { 
          "number":"14",
          "position":"14",
          "positionText":"R",
          "points":"0",
          "Driver":{  },
          "Constructor":{  },
          "grid":"12",
          "laps":"50",
          "status":"Vibrations",
          "FastestLap":{  }
      }
    ]
},



*/

interface IErgastService {
  /**
   * Peticion GET a servicio REST
   * @return Promesa con array de IDriverStandings
   */
  getDrivers(): angular.IPromise<IDriverStandings>;


  /**
   * Peticion GET a servicio REST
   * @return Promesa con array de IDriverStandings
   */
  getDriverDetails(id: string): angular.IPromise<IDriverStandings>;


  getDriverRaces(id: string): angular.IPromise<any>;

  /**
   * Peticion GET a servicio REST
   * @return Promesa con array de ICircuito
   */
  getCircuitos(): angular.IPromise<ICircuito>;
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
