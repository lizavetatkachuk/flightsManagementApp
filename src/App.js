import React,{useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Flight from "./components/Flight/Flight";
import SearchForm from "./components/SearchForm/SearchForm";
import Login from "./components/Login/Login";
import Details from "./components/Details/Details";
import Order from "./components/Orders/Order";
import AdminPane from "./components/AdminPane/AdminPane.tsx";
import Airports from "./components/Airports/Airports.tsx";
import Planes from "./components/Planes/Planes.tsx";
import AllFlights from "./components/AllFlights/AllFlights.tsx";
import AddFlight from "./components/AddFlight/AddFlight.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SideBar from './components/SideBar/SideBar.tsx';
import "./app.scss";

const App = () => {

  const [isOpen,setOpen]=useState(0);

  const onOpen=()=>{    
  setOpen(1);
  }

  const onClose=()=>{
    setOpen(0);
  }

  return (
    <Router>
      <div className="app">
        <Header onClick={onOpen}/>
        <SideBar isOpen={isOpen} onClick={onClose}/>    
        <Switch>
          <Route path="/" exact component={SearchForm} />
          <Route
            path="/flights/:from/:to/:return/:there/:back"
            exact
            component={Flight}
          />
          <Route
            path="/flights/:from/:to/:return/:there/:back/:id"
            component={Details}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute userRole="client" path="/orders" component={Order} />
          <PrivateRoute
            userRole="admin"
            exact
            path="/admin"
            component={AdminPane}
          />
          <PrivateRoute
            userRole="admin"
            path="/admin/airports"
            component={Airports}
          />
          <PrivateRoute
            userRole="admin"
            path="/admin/planes"
            component={Planes}
          />
          <PrivateRoute
            userRole="admin"
            exact
            path="/admin/flights"
            component={AllFlights}
          />
          <PrivateRoute
            userRole="admin"
            path="/admin/flights/add"
            component={AddFlight}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
