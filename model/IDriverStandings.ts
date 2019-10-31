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