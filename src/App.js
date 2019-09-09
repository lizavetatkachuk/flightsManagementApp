import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Flight from "./components/Flight/Flight";
import Register from "./components/Register/Register";
import SearchForm from "./components/SearchForm/SearchForm";
import Login from "./components/Login/Login";
import Details from "./components/Details/Details";
import Order from "./components/Orders/Order";
import AdminPane from "./components/AdminPane/AdminPane.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
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
          <PrivateRoute userRole="client" path="/orders" component={Order} />
          <PrivateRoute userRole="admin" path="/admin" component={AdminPane} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
