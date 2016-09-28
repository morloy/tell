import React, { Component } from 'react';
import { Link } from 'react-router';

// Cryptocat.Me.username = 'timo';
// Cryptocat.OMEMO.onAddDevice('master', '');
// setTimeout(function () {
//   Cryptocat.XMPP.connect(Cryptocat.Me.username,
//                          'test', function () {
//                            console.log('connected');
//                            Cryptocat.OMEMO.sendMessage('bob', 'Hallo');
//                           // Cryptocat.XMPP.disconnect(false);
//                          });
// }, 1000);



export default React.createClass({
  render() {
    return (
      <div>
        <div>
          <h2>Chat</h2>
          <Link to="/">home</Link>
        </div>
      </div>
    );
  }
});
