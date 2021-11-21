import React from "react";
import {useLazyQuery} from "@apollo/client";
import {GET_WEATHER_QUERY} from "../graphql/Queries";

const Home = (): JSX.Element => {
  const [citySearched, setCitySearched] = React.useState("");
  const [getWeather, {loading, data, error}] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: {name: citySearched},
  });
  // console.log("citySearched:", citySearched);
  if (loading) return <p>Loading ...</p>;
  if (error) return <h1>Error found</h1>;
  if (data?.getCityByName === null) return <h1>City not Found</h1>;

  // if (data) {
  //   console.log("data:", data);
  // }

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div>
      <h1>Search for Weather</h1>
      <input
        value={citySearched}
        type="text"
        placeholder="City name..."
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCitySearched(capitalize(event.target.value));
        }}
      />
      <button
        type="submit"
        onClick={(event: React.SyntheticEvent) => {
          event.preventDefault();
          getWeather();
        }}
      >
        Search
      </button>
      <div>
        {data && (
          <>
            <h2> {data.getCityByName.name} </h2>
            <h3>Temperature: {(data.getCityByName.weather.temperature.actual - 273.2).toFixed(1)}</h3>
            <h3>Description: {capitalize(data.getCityByName.weather.summary.description)}</h3>
            <h3>Wind Speed: {data.getCityByName.weather.wind.speed.toFixed(1)}</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
