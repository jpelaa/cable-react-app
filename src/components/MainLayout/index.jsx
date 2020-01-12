import React from "react";

const MainLayout = ({ children }) => {
  console.log(children, " props ");
  return (
    <div className="main">
      <div className="container-fluid">
        <div className="row">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
