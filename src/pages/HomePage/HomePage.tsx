import React, { Component, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Results from '../../components/Results/Results';
import { SearchValueContextProvider } from '../../contexts/SearchContext';
import { ResultsContextProvider } from '../../contexts/ResultsContext';

export default function HomePage() {
  const [results, setResults] = useState([]);

  const updateResults = (value) => {
    setResults(value);
  };

  return (
    <div>
      <SearchValueContextProvider>
        <ResultsContextProvider>
          <SearchBar updateResults={updateResults} />
          <Results />
        </ResultsContextProvider>
      </SearchValueContextProvider>
    </div>
  );
}
