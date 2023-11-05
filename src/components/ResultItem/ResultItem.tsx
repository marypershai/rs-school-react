import React, { Component } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

export default function ResultItem(props) {
  const [, setSearchParams] = useSearchParams();

  const { mal_id, title_english, title, year, images } = props.item;

  return (
    <li
      key={mal_id}
      className="results-item"
      onClick={() => {
        setSearchParams((searchParams) => {
          searchParams.set('productId', mal_id.toString());
          return searchParams;
        });
      }}
    >
      <div className="item-name">
        {title}/ {year}
      </div>
      <div className="item-info">
        <div className="item-info__line">
          <div className="item-info__title">English title:</div>
          <div className="item-info__value">{title_english}</div>
        </div>
        <div className="item-info__line">
          <div className="item-info__value">
            <img src={images.jpg.image_url} />
          </div>
        </div>
      </div>
    </li>
  );
}
