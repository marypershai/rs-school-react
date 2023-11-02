import React, { Component, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../assets/styles/SearchBar.css';
import { PersonInfo } from '../interfaces/interfaces';

export default function SearchBar(props) {
  const [inputValue, setInputValue] = useState('');
  const [, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { setSearchTerm } = props;

  const fetchData = (value) => {
    const query = value.toLowerCase();
    setIsLoading(true);
    const url: string = 'https://swapi.dev/api/people/';
    const endPoint: string = query ? url + '?search=' + query : url;
    fetch(endPoint)
      .then((response) => response.json())
      .then((json) => {
        setResults(json.results);
        setIsLoading(false);
        setInitialValue(query);
        props.updateResults(json.results);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
  };

  const handleValue = (value: string) => {
    setInputValue(value);
    setInitialValue(value);
    setIsLoading(false);
  };

  const getInitialValue = (): string => {
    return localStorage.getItem('inputValue') || '';
  };

  const setInitialValue = (value): void => {
    return localStorage.setItem('inputValue', value);
  };

  useEffect(() => {
    const value = getInitialValue();
    setInputValue(value);
    fetchData(value);
  }, [setSearchTerm]);

  const handleError = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHasError(true);
    event.preventDefault();
  };

  if (hasError) throw new Error('Fallback');

  return (
    <div>
      <button onClick={(e) => handleError(e)}>Make Error</button>
      <div className="input-wrapper">
        <FaSearch className="search-icon" />
        <input
          placeholder="Type to search"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleValue(e.target.value)
          }
        />
        <button onClick={() => fetchData(inputValue)} disabled={isLoading}>
          Search
        </button>
      </div>
    </div>
  );
}
