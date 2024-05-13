import './App.css';
import React from 'react';
import MainLayoutEmployee from './MainLayoutEmployee';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
      
        <MainLayoutEmployee />
        
      </Router>
    </div>
  );
}

export default App;
