import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Register from "./pages/Register";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Customers} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/logout" component={Login} />
        <Route exact path="/customer" component={Customers} />
        <Route exact path="/customer/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
