import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import './App.css';
import { PersonInfo } from './interfaces/interfaces';

type AppSate = {
  results?: [PersonInfo];
};

class App extends Component<unknown, AppSate> {
  state = {
    results: [],
  };

  updateResults = (value) => {
    this.setState((prevState) => {
      return {
        results: value,
      };
    });
  };

  render() {
    return (
      <div className="App">
        <div className="search-bar-component">
          <SearchBar updateResults={this.updateResults} />
          <Results results={this.state.results} />
        </div>
      </div>
    );
  }
}

export default App;
