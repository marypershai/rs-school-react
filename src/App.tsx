import React, { Component, useState } from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import './App.css';
import { PersonInfo } from './interfaces/interfaces';

type AppSate = {
  results?: [PersonInfo];
  hasError?: boolean;
};

export default function App() {
  const [results, setResults] = useState([]);
  const [hasError, setHasError] = useState(false);

  const updateResults = (value) => {
    setResults(value);
  };

  return (
    <div className="App">
      <div className="search-bar-component">
        <SearchBar updateResults={updateResults} />
        <Results results={results} />
      </div>
    </div>
  );
}
