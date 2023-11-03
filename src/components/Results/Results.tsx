import React, { Component } from 'react';
import { Daum } from '../../interfaces/interfaces';
import './Results.css';

export default function Results(props) {
  return (
    <div>
      <h1>Results</h1>
      <ul className="results-wrapper">
        {props.results.map((item: Daum) => (
          <li key={item.mal_id} className="results-item">
            <div className="item-name">
              {item.title}/ {item.year}
            </div>
            <div className="item-info">
              <div className="item-info__line">
                <div className="item-info__title">English title:</div>
                <div className="item-info__value">{item.title_english}</div>
              </div>
              {/*<div className="item-info__line">*/}
              {/*    <div className="item-info__title">Description:</div>*/}
              {/*    <div className="item-info__value">{item.synopsis}</div>*/}
              {/*</div>*/}
              <div className="item-info__line">
                <div className="item-info__value">
                  <img src={item.images.jpg.image_url} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
