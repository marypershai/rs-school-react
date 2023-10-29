import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import { PersonInfo, PersonsList } from '../interfaces/interfaces';

type SearchBarState = {
  inputValue?: string;
  results?: [PersonInfo];
  filteredResults?: [PersonInfo];
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

  fetchData = async () => {
    const result: Response = await fetch('https://swapi.dev/api/people/');
    await result.json().then((res: PersonsList) => {
      this.setState({ results: res.results });
    });
  };

  handleValue = (value: string) => {
    this.setState({ inputValue: value });
    this.setInitialValue(value);
    this.filterResults(this.state.inputValue);
  };

  getInitialValue(): string {
    return localStorage.getItem('inputValue') || '';
  }

  setInitialValue(value): void {
    return localStorage.setItem('inputValue', value);
  }

  componentDidMount() {
    this.fetchData().then((r) => console.log(this.state.results));
  }

  searchResults = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.props.updateResults(this.state.filteredResults);
  };

  filterResults = (value: string) => {
    const cloneRes: [PersonInfo] = this.state.results.slice();
    const filtered: [PersonInfo] = cloneRes.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState((prevState) => {
      return {
        filteredResults: filtered,
      };
    });
  };

  render() {
    console.log('render');
    return (
      <div>
        <div className="input-wrapper">
          <FaSearch className="search-icon" />
          <input
            placeholder="Type to search"
            value={this.state.inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              this.handleValue(e.target.value)
            }
          />
          <button onClick={this.searchResults}>Search</button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
