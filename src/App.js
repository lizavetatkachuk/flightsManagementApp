import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Flight from "./components/Flight/Flight";
import Register from "./components/Register/Register";
import SearchForm from "./components/SearchForm/SearchForm";
import Login from "./components/Login/Login";
import Details from "./components/Details/Details";
import "./app.scss";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={SearchForm} />
          <Route path="/flights" exact component={Flight} />
          <Route path="/flights/:id" component={Details} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
