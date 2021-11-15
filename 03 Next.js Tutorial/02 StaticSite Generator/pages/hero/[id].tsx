import {useRouter} from "next/router";
import React from "react";

import Axios from "../../helpers/axios";

interface PowerStats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}

export default function Hero({image, name, powerstats}: {image: {url: string}; name: string; powerstats: PowerStats}) {
  const {isFallback} = useRouter();

  const {intelligence, strength, speed, durability, power, combat} = powerstats;

  if (isFallback) {
    return <p>Data is loading...</p>;
  }

  return (
    <React.Fragment>
      <h1>Hello Hero: {name}</h1>
      <img alt={`Photo of ${name}`} src={image.url} />
      <h2>Hero stats:</h2>
      <p>intelligence: {intelligence}</p>
      <p>strength: {strength}</p>
      <p>speed: {speed}</p>
      <p>durability: {durability}</p>
      <p>power: {power}</p>
      <p>combat: {combat}</p>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const {data} = await Axios.get("/search/a");
  const {results} = data;
  const paths = results.map(({id}: {id: number}) => ({params: {id: id.toString()}}));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({params}: {params: {id: number}}) {
  // console.log("params:", params);
  const {data} = await Axios.get(`/${params.id}`);
  return {
    props: {
      ...data,
    },
  };
}
