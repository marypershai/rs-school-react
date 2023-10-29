import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import './App.css';
import { PersonInfo } from './interfaces/interfaces';

type AppSate = {
  filteredResults?: [PersonInfo];
  isLoading?: boolean;
};

class App extends Component<unknown, AppSate> {
  state = {
    filteredResults: [],
    isLoading: false,
  };

  updateResults = (value) => {
    this.setState((prevState) => {
      return {
        filteredResults: value,
      };
    });
  };

  render() {
    return (
      <div className="App">
        <div className="search-bar-component">
          <SearchBar updateResults={this.updateResults} />
          <Results results={this.state.filteredResults} />
        </div>
      </div>
    );
  }
}

export default App;
