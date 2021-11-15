import type {NextPage} from "next";
import Link from "next/link";
import React from "react";

import Axios from "../helpers/axios";

const Home: NextPage = ({isRequestFailed, heroes}: any): JSX.Element => {
  if (isRequestFailed) {
    return <p>Oops, something went wrong... </p>;
  }
  // console.log("isRequestFailed, heroes:", isRequestFailed, heroes);

  const heroesElements = heroes.map((hero: {id: number}) => <HeroElement key={hero.id} {...hero} />);

  return (
    <div className="container">
      <h1 className="header">Hero Encyclopedia</h1>
      <ul className="hero-list">{heroesElements}</ul>
    </div>
  );
};

export default Home;

function HeroElement({id, name, url}: {id: number; name?: string; url?: string}) {
  return (
    <li className="hero-list__element">
      <Link href={`/hero/${id}`}>
        <a className="hero-list__link">
          <img src={url} alt={`Photo of ${name}`} className="hero-list__img" />
          <p className="hero-list__p">{name}</p>
        </a>
      </Link>
    </li>
  );
}

export async function getStaticProps() {
  const {data, status} = await Axios.get("/search/a");

  if (status !== 200) {
    return {props: {isRequestFailed: true}};
  }

  // console.log("data:", data);
  const {results} = data;
  // console.log("results:", results);
  const heroes = results.map(({id, name, image: {url}}: {id: number; name?: string; image: {url: string}}) => ({
    id,
    name,
    url,
  }));

  return {
    props: {
      heroes: heroes,
      isRequestFailed: false,
    },
  };
}
