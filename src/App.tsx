import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import './App.css';

class App extends Component<unknown, unknown> {
  state = {
    results: [],
  };

  updateResults = (value) => {
    this.setState({ results: value });
    console.log('--------------');
    console.log(value);
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
