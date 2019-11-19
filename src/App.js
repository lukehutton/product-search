import React from "react";
import "./sass/app.scss";
import ProductSearch from "./components/ProductSearch";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Route path="/:keyword?">
        <ProductSearch />
      </Route>
    </Router>
  );
}

export default App;
