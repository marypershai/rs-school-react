import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

type SearchBarState = {
  inputValue: string;
};

class SearchBar extends Component<unknown, SearchBarState> {
  state = {
    inputValue: this.getInitialValue(),
  };

  fetchData() {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((responce) => responce.json())
      .then((json) => {
        console.log(json);
      });
  }

  handleValue(value) {
    this.setState({ inputValue: value });
    this.fetchData();
    this.setInitialValue(value);
  }

  getInitialValue() {
    return localStorage.getItem('inputValue') || '';
  }

  setInitialValue(value) {
    return localStorage.setItem('inputValue', value);
  }

  render() {
    return (
      <div>
        <div className="input-wrapper">
          <FaSearch className="search-icon" />
          <input
            placeholder="Type to search"
            value={this.state.inputValue}
            onChange={(e) => this.handleValue(e.target.value)}
          />
        </div>
        <button>Search</button>
      </div>
    );
  }
}

export default SearchBar;
