import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY: ProcessEnv = process.env.REACT_APP_OPEN_WEATHER_KEY;
// console.log("API_KEY:", API_KEY);

export const fetchWeather = async (query: string) => {
  // console.log("query:", query);
  const {data} = await axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      APPID: API_KEY,
    },
  });
  return data;
};
