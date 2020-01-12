import React, { lazy, Suspense } from "react";
import { Router } from "@reach/router";

const Dashboard = lazy(() => import("layouts/Dashboard"));
const Login = lazy(() => import("layouts/Login"));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Dashboard path="/" />
        <Login path="login" />
      </Router>
    </Suspense>
  );
};

export default Routes;
