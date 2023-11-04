import React, { Component, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Results from '../../components/Results/Results';

export default function HomePage() {
  const [results, setResults] = useState([]);

  const updateResults = (value) => {
    setResults(value);
  };

  return (
    <div className="search-bar-component">
      <SearchBar updateResults={updateResults} />
      <Results results={results} />
    </div>
  );
}
