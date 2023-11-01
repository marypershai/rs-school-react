import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../assets/styles/SearchBar.css';
import { PersonInfo, PersonsList } from '../interfaces/interfaces';

type SearchBarState = {
  inputValue?: string;
  results?: [PersonInfo];
  isLoading?: boolean;
  hasError?: boolean;
};

type SearchBarProps = {
  updateResults: (value: []) => void;
};

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state = {
    inputValue: this.getInitialValue(),
    results: [],
    isLoading: false,
    hasError: false,
  };

  constructor(props: SearchBarProps) {
    super(props);
    this.setState = this.setState.bind(this);
  }

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
    this.props.updateResults(this.state.results);
  };

  componentDidMount() {
    this.fetchData();
  }

  handleError(event: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      ...this.state,
      hasError: true,
    });
    event.preventDefault();
  }

  render() {
    if (this.state.hasError) throw new Error('Fallback');
    return (
      <div>
        <button onClick={(e) => this.handleError(e)}>Make Error</button>
        <div className="input-wrapper">
          <FaSearch className="search-icon" />
          <input
            placeholder="Type to search"
            value={this.state.inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              this.handleValue(e.target.value)
            }
          />
          <button onClick={this.searchResults} disabled={this.state.isLoading}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
