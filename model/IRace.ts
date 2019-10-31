interface IAverageSpeed{
    speed: string;
    units: string;
  }
  
  interface ITime{
    time: string;
  }
  
  interface IFastestLap{
    AverageSpeed: IAverageSpeed;
    Time: ITime;
    lap: string;
    rank: string;
  
  }
  
  interface IRace{
    number: string;
    position: string;
    positionText: string;
    points: string;
    Driver: IDriver;
    Constructor: Array<IConstructors>;
    grid: string;
    laps: string;
    status: string;
    FastestLap: IFastestLap;
  }