import React from "react";
import ReactDOM from "react-dom";
import "assets/main.css";
import "assets/scss/index.scss";

//Routes
import Routes from "routes";

//State provider
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "services";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);
