import React, { Component } from 'react';
import { PersonInfo } from '../interfaces/interfaces';

class Results extends Component<{ results: [PersonInfo] }, unknown> {
  render() {
    return (
      <div>
        <h1>Results</h1>
        <ul>
          {this.props.results.map((item: PersonInfo) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Results;
