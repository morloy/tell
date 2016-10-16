import React, { Component } from 'react';

const messages = {
  'not-connected': 'Connecting ...',
  'no-internet': 'No Internet Connection.',
}

const Connecting = ({status}) => (
  <h1 style={{
      width: '300px',
      paddingTop: '200px',
      textAlign: 'center',
      margin: 'auto'
  }}>
    {messages[status]}
  </h1>
)

export default Connecting;
