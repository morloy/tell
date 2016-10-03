import React, { Component } from 'react';
import { Link } from 'react-router';
import ChatPage from '../containers/ChatPage';
import RegisterPage from '../containers/RegisterPage';

import { Button } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          { this.props.settings.profile ? <ChatPage /> : <RegisterPage /> }
        </div>
      </div>
    );
  }
}
