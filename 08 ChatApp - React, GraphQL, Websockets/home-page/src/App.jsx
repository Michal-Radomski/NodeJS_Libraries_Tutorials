import React from "react";
import ReactDOM from "react-dom";
import {Container} from "shards-react-fork";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import "./index.scss";

import Chat from "chat/Chat";

const App = () => (
  <Container style={{marginTop: "20px"}}>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, nulla eum quis adipisci corrupti earum.</p>
    <h1>Chat!</h1>
    <Chat />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, architecto! Deserunt, eum commodi neque quidem
      architecto velit dolorem beatae ut ipsa incidunt eligendi rem quaerat!
    </p>
  </Container>
);

ReactDOM.render(<App />, document.getElementById("app"));
