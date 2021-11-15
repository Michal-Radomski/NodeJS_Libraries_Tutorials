import {useRouter} from "next/router";

export default function PageNotFound() {
  const {back} = useRouter();
  return (
    <p>
      Oops something went wrong... Back to previous page.
      <br />
      <button onClick={back}>Back</button>
    </p>
  );
}
