import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

import { Button } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Home</h2>
          <Link to="/register">register</Link> | <Link to="/chat">chat</Link>
        </div>
      </div>
    );
  }
}
