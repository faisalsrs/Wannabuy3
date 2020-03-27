import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link, Redirect, Router } from "@reach/router";

import CreateItem from "./views/CreateItem";
import SingleItem from "./views/SingleItem";
import Items from "./views/Items";
// import EditItem from "./views/EditItem";

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>WannaBuy.com</h1>
          </div>
          <div className="col">
            <Link to="/wannabuys/new">What do you want to buy?</Link>
          </div>
          <div className="col">
            <Link to="/wannabuys/">Back to home</Link>
          </div>
        </div>
      </div>
      <div className="container-flex justify-content-center">
        <Router>
          <Redirect from="/" to="/wannabuys" noThrow="true" />
          <CreateItem path="/wannabuys/new" />
          <SingleItem path="/wannabuys/:id" />
          <Items path="/wannabuys" />
        </Router>
      </div>
    </>
  );
}

export default App;
