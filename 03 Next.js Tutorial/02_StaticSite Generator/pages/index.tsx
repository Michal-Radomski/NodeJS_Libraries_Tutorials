import type {NextPage} from "next";
import Link from "next/link";
import React from "react";

import Axios from "../helpers/axios";

const Home: NextPage = ({isRequestFailed, heroes}: any) => {
  if (isRequestFailed) {
    return <p>Oops, something went wrong... </p>;
  }
  // console.log("isRequestFailed, heroes:", isRequestFailed, heroes);

  const heroesElements = heroes.map((hero: {id: any}) => <HeroElement key={hero.id} {...hero} />);

  return (
    <div className="container">
      <h1 className="header">Hero Encyclopedia</h1>
      <ul className="hero-list">{heroesElements}</ul>
    </div>
  );
};

export default Home;

function HeroElement({id, name, url}: any) {
  return (
    <li className="hero-list">
      <Link href={`/hero/${id}`}>
        <a>
          <img src={url} alt={`Photo of ${name}`} />
          <p>{name}</p>
        </a>
      </Link>
    </li>
  );
}

export async function getStaticProps() {
  const {data, status}: any = await Axios.get("/search/a");

  if (status !== 200) {
    return {props: {isRequestFailed: true}};
  }

  // console.log("data:", data);
  const {results} = data;
  // console.log("results:", results);
  const heroes = results.map(({id, name, image: {url}}: any) => ({id, name, url}));

  return {
    props: {
      heroes: heroes,
      isRequestFailed: false,
    },
  };
}
