import React from 'react';
import SearchComponent from './Search.js'
import './App.css';

function App() {
  return (
    <div class="container">
        <div class="toppart">
            <h1>Covid19 Data</h1>
            <SearchComponent />
        </div>
        <footer>All data gathered from <a href="https://pomber.github.io/covid19/timeseries.json" target="_blank">https://pomber.github.io/covid19/timeseries.json</a></footer>
    </div>
  );
}

export default App;
