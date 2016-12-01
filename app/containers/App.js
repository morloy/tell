import React, { Component, PropTypes } from 'react';
import ConnectionManager from './ConnectionManager';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        <ConnectionManager />
        {this.props.children}
      </div>
    );
  }
}
