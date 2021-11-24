import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./graphql";

import App from "./App";
import {store} from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
