import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import { PersonInfo, PersonsList } from '../interfaces/interfaces';
import ErrorBoundary from '../ErrorBoundary';

type SearchBarState = {
  inputValue?: string;
  results?: [PersonInfo];
  isLoading?: boolean;
};

type SearchBarProps = {
  updateResults: (value: []) => void;
};

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state = {
    inputValue: this.getInitialValue(),
    results: [],
    isLoading: false,
  };

  fetchData() {
    this.setState({ isLoading: true });
    const url: string = 'https://swapi.dev/api/people/';
    const endPoint: string = this.state.inputValue
      ? url + '?search=' + this.state.inputValue
      : url;
    fetch(endPoint)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ results: json.results });
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: true });
      });
    console.log('fetchData');
    console.log(this.state.results);
  }

  handleValue = (value: string) => {
    this.setState({ inputValue: value });
    this.setInitialValue(value);
    this.setState({ isLoading: false });
  };

  getInitialValue(): string {
    return localStorage.getItem('inputValue') || '';
  }

  setInitialValue(value): void {
    return localStorage.setItem('inputValue', value);
  }

  searchResults = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.fetchData();
    console.log('props');
    console.log(this.state.results);
    this.props.updateResults(this.state.results);
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <ErrorBoundary
          fallback={<p>Something went wrong, please reload the page</p>}
        >
          <div className="input-wrapper">
            <FaSearch className="search-icon" />
            <input
              placeholder="Type to search"
              value={this.state.inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleValue(e.target.value)
              }
            />
            <button
              onClick={this.searchResults}
              disabled={this.state.isLoading}
            >
              Search
            </button>
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default SearchBar;
