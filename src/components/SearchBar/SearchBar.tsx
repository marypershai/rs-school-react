import React, { Component, useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import PageLimit from '../PageLimit/PageLimit';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';
import { SearchValueContext } from '../../contexts/SearchContext';
import { ResultsContext } from '../../contexts/ResultsContext';

export default function SearchBar(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams('');
  const pageQueryParam = searchParams.get('page');
  const page = pageQueryParam ? Number(pageQueryParam) : 1;
  const { searchValue } = useContext(SearchValueContext);
  const { setResults } = useContext(ResultsContext);

  const pageLimit: string = searchParams.get('pageLimit');

  const fetchData = (value, limit): void => {
    const query = value.toLowerCase();

    const url = createFetchDataURL(value, limit);

    fetch(url)
      .then((response: Response) => response.json())
      .then((json) => {
        setResults(json.data);
        setIsLoading(false);
        setInitialValue(query);
      })
      .catch((error) => {
        setIsLoading(true);
      });
  };

  const createFetchDataURL = (value, limit): string => {
    const query = value.toLowerCase();
    let url: string = 'https://api.jikan.moe/v4/anime';
    url = query ? url + '?q=' + query + '&' : url + '?';
    url = limit ? url + 'limit=' + limit + '&' : url + 'limit=10&';
    url = page ? url + 'page=' + page : 'page=1';
    return url;
  };

  const handleValue = (value: string): void => {
    setInputValue(value);
    setInitialValue(value);
    setIsLoading(false);
  };

  const setInitialValue = (value): void => {
    return localStorage.setItem('inputValue', value);
  };

  useEffect(() => {
    setInputValue(searchValue);
    fetchData(searchValue, pageLimit);
  }, [pageLimit, page]);

  const handleError = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setHasError(true);
    event.preventDefault();
  };

  if (hasError) throw new Error('Fallback');

  return (
    <div className="search-bar-component">
      <button className="error-btn" onClick={(e) => handleError(e)}>
        Make Error
      </button>
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
          className="search-btn"
          onClick={() => {
            setSearchParams((searchParams) => {
              searchParams.set('page', '1');
              return searchParams;
            });
            fetchData(inputValue, pageLimit);
          }}
          disabled={isLoading}
        >
          Search
        </button>
      </div>
      <div className="nav-bar">
        <PageLimit></PageLimit>
        <Pagination page={page} setSearchParams={setSearchParams}></Pagination>
      </div>
    </div>
  );
}
