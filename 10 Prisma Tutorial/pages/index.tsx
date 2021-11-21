import Head from "next/head";
import React from "react";
import Link from "next/link";
import {PrismaClient} from "@prisma/client";

import styles from "../styles/Home.module.scss";

const prisma = new PrismaClient();

export default function Home({data}: Movie[] | any): JSX.Element {
  // console.log("data:", data);
  const [formData, setFormData] = React.useState({});
  const [movies, setMovies] = React.useState(data);

  async function saveMovie(event: React.SyntheticEvent) {
    event.preventDefault();
    setMovies([...movies, formData]);
    const response = await fetch("/api/movies", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    return await response.json();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie list</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul className={styles.movieList}>
          {movies.map((item: Movie) => (
            <li key={item.id}>
              <span>
                <strong>{item.title}</strong>
              </span>
              <span>{item.year}</span>
              <span>{item.description}</span>
              <Link href={`/movies/${item.slug}`}>
                <a>More about this movie</a>
              </Link>
            </li>
          ))}
        </ul>

        <form className={styles.movieForm} onSubmit={saveMovie}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={(event) => setFormData({...formData, title: event.target.value})}
          />
          <input
            type="text"
            placeholder="Year"
            name="year"
            //- +event.target.value -> it'll be a number = the same as below
            // onChange={(event) => setFormData({...formData, year: parseInt(event.target.value)})}
            onChange={(event) => setFormData({...formData, year: +event.target.value})}
          />
          <textarea
            name="description"
            id=""
            cols={30}
            rows={10}
            placeholder="Description"
            onChange={(event) => setFormData({...formData, description: event.target.value})}
          />
          <input
            type="text"
            placeholder="Slug"
            name="slug"
            onChange={(event) => setFormData({...formData, slug: event.target.value})}
          />
          <button type="submit">Add movie</button>
        </form>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const movies = await prisma.movie.findMany();

  return {
    props: {
      data: movies,
    },
  };
}
