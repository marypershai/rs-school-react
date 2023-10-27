import React from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="search-bar-component">
        <SearchBar></SearchBar>
        <Results></Results>
      </div>
    </div>
  );
}

export default App;
