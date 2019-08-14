import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-dashboard">
        <p>EasyFly</p>
        </header>
      <div className="App-container">
        <div className="Main-item" id="Direction">
          <div className="Second-item">
          <p> From</p> 
          </div>
          <div className="Second-item">
          <p> Shift</p> 
          </div>
          <div className="Second-item">
          <p> To</p> 
          </div>
        </div>
        <div className="Main-item" id="ThereAndBack">
        <div className="Second-item">
          <p> One way</p> 
          </div>
          <div className="Second-item">
          <p> Return</p> 
          </div>
        </div>
        <div className="Main-item" id="Dates">
        <div className="Second-item">
          <p> Fly there</p> 
          </div>
          <div className="Second-item">
          <p> Fly back</p> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
