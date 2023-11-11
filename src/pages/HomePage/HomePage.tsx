import React, { Component, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Results from '../../components/Results/Results';
import { SearchValueContextProvider } from '../../contexts/SearchContext';
import { ResultsContextProvider } from '../../contexts/ResultsContext';
import { CardContextProvider } from '../../contexts/CardContext';

export default function HomePage() {
  return (
    <div>
      <SearchValueContextProvider>
        <ResultsContextProvider>
          <SearchBar />
          <CardContextProvider>
            <Results />
          </CardContextProvider>
        </ResultsContextProvider>
      </SearchValueContextProvider>
    </div>
  );
}
