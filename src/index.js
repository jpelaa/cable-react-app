import React from "react";
import ReactDOM from "react-dom";
import "assets/scss/bootstrap.scss";

//Routes
import Routes from "routes";

//MainLayout
import MainLayout from "components/MainLayout";

ReactDOM.render(
  <MainLayout>
    <Routes />
  </MainLayout>,
  document.getElementById("root")
);
