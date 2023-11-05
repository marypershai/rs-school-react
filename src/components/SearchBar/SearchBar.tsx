import React, { Component, useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import PageLimit from '../PageLimit/PageLimit';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';

export default function SearchBar(props) {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams('');
  const pageQueryParam = searchParams.get('page');
  const page = pageQueryParam ? Number(pageQueryParam) : 1;

  const pageLimit = searchParams.get('pageLimit');

  const { setSearchTerm } = props;

  const fetchData = (value, limit) => {
    const query = value.toLowerCase();

    const url = createFetchDataURL(value, limit);

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setResults(json.data);
        setIsLoading(false);
        setInitialValue(query);
        props.updateResults(json.data);
      })
      .catch((error) => {
        setIsLoading(true);
      });
  };

  const createFetchDataURL = (value, limit) => {
    const query = value.toLowerCase();
    let url: string = 'https://api.jikan.moe/v4/anime';
    url = query ? url + '?q=' + query : url;
    url = limit ? url + '&limit=' + limit : url;
    url = page ? url + '&page=' + page : '&page=1';
    return url;
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
    fetchData(value, pageLimit);
  }, [setSearchTerm, pageLimit, page]);

  const handleError = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHasError(true);
    event.preventDefault();
  };

  if (hasError) throw new Error('Fallback');

  return (
    <div className="search-bar-component">
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
        <button
          onClick={() => fetchData(inputValue, pageLimit)}
          disabled={isLoading}
        >
          Search
        </button>
      </div>
      <PageLimit></PageLimit>
      <Pagination page={page} setSearchParams={setSearchParams}></Pagination>
    </div>
  );
}
