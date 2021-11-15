import type {NextPage} from "next";
import React from "react";
import Link from "next/link";

const Home: NextPage = (): JSX.Element => {
  return (
    <React.Fragment>
      <h1>First Next.js App</h1>
      <Link href={`/memes/`}>
        <a>Go to memes</a>
      </Link>
    </React.Fragment>
  );
};

export default Home;
