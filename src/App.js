import React from "react";
import "./App.scss";
import Flight from "./components/Flight";
import Header from "./components/Header";
import Register from "./components/Register";
import Filter from "./components/Filter";
import SearchForm from "./components/SearchForm";
import Login from "./components/Login";
const data = [
  {
    price: 136,
    time: "12.00-13.00",
    company: "Ryanair"
  },
  {
    price: 136,
    time: "12.00-13.00",
    company: "Ryanair"
  },
  {
    price: 136,
    time: "12.00-13.00",
    company: "Ryanair"
  },
  {
    price: 136,
    time: "12.00-13.00",
    company: "Ryanair"
  }
];
const App = () => {
  return (
    // <div className="App">
    //   <Header />
    //   <SearchForm />
    // </div>
    // <div className="App">
    //   <Header />
    //   <Login />
    // </div>
    // <div className="App">
    //   <Header />
    //   <Filter />
    //   <Flight flights={data} />
    // </div>
    <div className="App">
      <Header />
      <Register />
    </div>
  );
};

export default App;
