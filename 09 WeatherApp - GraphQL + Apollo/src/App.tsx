import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

import "./App.scss";
import Home from "./Pages/Home";

function App(): JSX.Element {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://graphql-weather-api.herokuapp.com/",
  });

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
