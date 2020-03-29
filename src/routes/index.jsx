import React, { lazy, Suspense } from "react";
import { Router, Redirect } from "@reach/router";
import routes from "static/routes";

const Dashboard = lazy(() => import("layouts/Dashboard"));
const Login = lazy(() => import("layouts/Login"));
const Packages = lazy(() => import("layouts/Packages"));
const Customers = lazy(() => import("layouts/Customers"));
const Package = lazy(() => import("layouts/Package"));
const CreatePackage = lazy(() => import("layouts/CreatePackage"));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Dashboard path={routes.home}>
          <Packages path={routes.packages} />
          <Package path={`${routes.packages}/:packageId`} />
          <CreatePackage path={`${routes.packages}/${routes.create}`} />
          <Customers path={routes.customers} />
        </Dashboard>
        <Login path={routes.login} />
      </Router>
    </Suspense>
  );
};

export default Routes;
