import Link from "next/link";
import React from "react";

export default function Memes({memes}: {memes: {id: number; name: string; url: string}[]}): JSX.Element {
  const listElements = memes.map((mem) => (
    <li key={mem.id}>
      <Link href={`/memes/${mem.id}`}>
        <a>{mem.name}</a>
      </Link>
      {" -> "}
      {mem.url}
    </li>
  ));
  return (
    <React.Fragment>
      <h1>Memes</h1>
      <ul>{listElements}</ul>
    </React.Fragment>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  const {data, success} = await response.json();
  if (!success) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const {memes} = data;
  return {
    props: {memes},
  };
};
