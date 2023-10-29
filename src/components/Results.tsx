import React, { Component } from 'react';
import { PersonInfo } from '../interfaces/interfaces';
import './Results.css';

class Results extends Component<{ results: [PersonInfo] }, unknown> {
  render() {
    return (
      <div>
        <h1>Results</h1>
        <ul className="results-wrapper">
          {this.props.results.map((item: PersonInfo) => (
            <li key={item.name} className="results-item">
              <div className="item-name">{item.name}</div>
              <div className="item-info">
                <div className="item-info__line">
                  <div className="item-info__title">Gender:</div>
                  <div className="item-info__value">{item.gender}</div>
                </div>
                <div className="item-info__line">
                  <div className="item-info__title">Birth Year:</div>
                  <div className="item-info__value">{item.birth_year}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Results;
