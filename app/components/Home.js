import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

import { Button } from 'react-bootstrap';

export default class Home extends Component {
  componentDidMount () {
    Cryptocat.Me.username == 'AgNJunzmAUwQPY66Cri5ohZ8oGZy4FdPGCpmRrQtavih';
    Cryptocat.XMPP.connect(Cryptocat.Me.username,
                           'A5GZMuuDRLgH7n3ugkywnH', function () {
                             console.log('connected');
                           });
  }
  render() {
    return (
      <div>
        <div>
          <h2>Home</h2>
          <Link to="/register">register</Link>
        </div>
      </div>
    );
  }
}
