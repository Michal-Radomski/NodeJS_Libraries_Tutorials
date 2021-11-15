import {useRouter} from "next/router";
import React from "react";
// import Image from "next/image";

export default function Mem({mem}: {mem: {url: string; name: string}}): JSX.Element {
  const {back} = useRouter();
  // console.log("Jestem na froncie");
  // console.log(mem);
  return (
    <React.Fragment>
      <h1>Mem</h1>
      <button onClick={() => back()}>Back</button>
      <img src={`${mem.url}`} alt={`Mem ${mem.name}`} />
    </React.Fragment>
  );
}

export async function getServerSideProps(context: {params: {id: string}}) {
  // console.log("context:", context);s
  const {id} = context.params;
  // console.log("id:", id);
  // console.log("Jestem na backend");
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
  const mem = data.memes.find((mem: {id: string}) => mem.id === id);
  return {
    props: {
      mem: mem,
    },
  };
}
