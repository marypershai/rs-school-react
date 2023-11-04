import React, { Component } from 'react';
import { Daum } from '../../interfaces/interfaces';
import './Results.css';
import PageLimit from '../PageLimit/PageLimit';
import { Outlet, useSearchParams } from 'react-router-dom';

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
          console.log(e.target);
          console.log(e.currentTarget);
          if (e.target === e.currentTarget) {
            setSearchParams((searchParams) => {
              searchParams.delete('productId');
              return searchParams;
            });
          }
        }}
      >
        {props.results.map((item: Daum) => (
          <li
            key={item.mal_id}
            className="results-item"
            onClick={() => {
              setSearchParams((searchParams) => {
                searchParams.set('productId', item.mal_id.toString());
                return searchParams;
              });
            }}
          >
            <div className="item-name">
              {item.title}/ {item.year}
            </div>
            <div className="item-info">
              <div className="item-info__line">
                <div className="item-info__title">English title:</div>
                <div className="item-info__value">{item.title_english}</div>
              </div>
              <div className="item-info__line">
                <div className="item-info__value">
                  <img src={item.images.jpg.image_url} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {productId ? <Outlet /> : ''}
    </div>
  );
}
