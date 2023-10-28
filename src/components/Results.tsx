import React, { Component } from 'react';

class Results extends Component<{ results: [] }, unknown> {
  render() {
    return (
      <div>
        <h1>Results</h1>
        <div>{this.props.results.join()}</div>
      </div>
    );
  }
}

export default Results;
