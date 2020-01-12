import React, { useState } from "react";

//static
import { appName } from "static";

const LogIn = () => {
  return (
    <div className="d-flex justify-content-center align-items-center login">
      <div className="col-md-4 col-md-offset-4 ">
        <h1 className="login-title">{appName}</h1>
        <div className="login-card">
          <h6 className="text-center">Welcome back</h6>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group text-center">
            <button type="button" className="btn btn-primary">
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
