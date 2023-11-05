import React, { Component } from 'react';
import { Daum } from '../../interfaces/interfaces';
import './Results.css';
import PageLimit from '../PageLimit/PageLimit';
import { Outlet, useSearchParams } from 'react-router-dom';
import ResultItem from '../ResultItem/ResultItem';

export default function Results(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const productId = searchParams.get('productId');

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
        {props.results.map((item: Daum) => (
          <ResultItem item={item} key={item.mal_id}></ResultItem>
        ))}
      </ul>
      {productId ? <Outlet /> : ''}
    </div>
  );
}
