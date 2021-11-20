import * as React from "react";
import * as ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import "./index.scss";
import Chat from "./Chat";

const App = (): JSX.Element => <Chat />;

ReactDOM.render(<App />, document.getElementById("app"));
