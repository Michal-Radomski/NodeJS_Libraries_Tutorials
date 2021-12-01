// Types and Interfaces

type ProcessEnv = string | any;

interface Data {
  main: {
    temp: number;
  };
  name: string;
  sys: {country: string};
  weather: [{main: string; description: string}];
}
