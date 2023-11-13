import React, { Component, useContext } from 'react';
import { Daum } from '../../interfaces/interfaces';
import './Results.css';
import { Outlet, useSearchParams } from 'react-router-dom';
import ResultItem from '../ResultItem/ResultItem';
import { ResultsContext } from '../../contexts/ResultsContext';

export default function Results(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const { items } = useContext(ResultsContext);

  const productId: string = searchParams.get('productId');

  return (
    <div
      className={
        productId ? 'details-layout results-component' : 'results-component'
      }
    >
      <ul
        className="results-wrapper"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSearchParams((searchParams) => {
              searchParams.delete('productId');
              return searchParams;
            });
          }
        }}
      >
        {items.map((item: Daum) => (
          <ResultItem item={item} key={item.mal_id}></ResultItem>
        ))}
      </ul>
      {productId ? <Outlet /> : ''}
    </div>
  );
}
