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