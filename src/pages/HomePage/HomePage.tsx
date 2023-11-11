import React, { Component, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Results from '../../components/Results/Results';
import { SearchValueContextProvider } from '../../contexts/SearchContext';

export default function HomePage() {
  const [results, setResults] = useState([]);

  const updateResults = (value) => {
    setResults(value);
  };

  return (
    <div>
      <SearchValueContextProvider>
        <SearchBar updateResults={updateResults} />
        <Results results={results} />
      </SearchValueContextProvider>
    </div>
  );
}
