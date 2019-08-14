import React from 'react';
import './App.scss';
import Header from './components/Header';
import SearchForm from './components/SearchForm'
function App() {
  return (
    <div className="App">
      <Header></Header>        
      <SearchForm></SearchForm>
    </div>
  );
}

export default App;
