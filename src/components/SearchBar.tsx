import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

type SearchBarState = {
  inputValue?: string;
  results?: [];
  filteredResults?: [];
};

type SearchBarProps = {
  updateResults: (value: []) => void;
};

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state = {
    inputValue: this.getInitialValue(),
    results: [],
    filteredResults: [],
  };

  fetchData() {
    fetch('https://swapi.dev/api/people/')
      .then((responce) => responce.json())
      .then((json) => {
        console.log(json);
        this.setState({ results: json.results });
      });
  }

  handleValue = (value: string) => {
    this.setState({ inputValue: value });
    this.setInitialValue(value);
  };

  getInitialValue(): string {
    return localStorage.getItem('inputValue') || '';
  }

  setInitialValue(value): void {
    return localStorage.setItem('inputValue', value);
  }

  componentDidMount() {
    this.fetchData();
  }

  searchResults = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.filterResults(this.state.inputValue);
    console.log('this.state.filt');
    console.log(this.state.filteredResults);
    this.props.updateResults(this.state.filteredResults);
  };

  filterResults = (value: string) => {
    const cloneRes = this.state.results.slice();
    const filtered: [] = cloneRes.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log('filtered');
    console.log(filtered);
    this.setState({ filteredResults: filtered });
  };

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
          <button onClick={this.searchResults}>Search</button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
