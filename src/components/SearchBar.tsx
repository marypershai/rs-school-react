import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../assets/styles/SearchBar.css';
import { PersonInfo } from '../interfaces/interfaces';

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
    inputValue: '',
    results: [],
    isLoading: false,
    hasError: false,
  };

  constructor(props: SearchBarProps) {
    super(props);
    this.setState = this.setState.bind(this);
  }

  fetchData(value) {
    const query = value.toLowerCase();
    this.setState({ isLoading: true });
    const url: string = 'https://swapi.dev/api/people/';
    const endPoint: string = query ? url + '?search=' + query : url;
    fetch(endPoint)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ results: json.results });
        this.setState({ isLoading: false });
        this.setInitialValue(query);
        this.props.updateResults(json.results);
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

  componentDidMount(): void {
    const value = this.getInitialValue();
    this.setState({ ...this.state, inputValue: value });
    this.fetchData(value);
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
          <button
            onClick={() => this.fetchData(this.state.inputValue)}
            disabled={this.state.isLoading}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
