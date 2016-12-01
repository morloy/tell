import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import ContactList from '../containers/ContactList';
import colors from '../utils/colors';
import {
  Form, FormGroup, ControlLabel,
  FormControl, HelpBlock, Button, Glyphicon, Image,
  Panel
} from 'react-bootstrap';

import { Grid, Row, Col } from 'react-bootstrap';

export const MERGE_TIME = 5*60*1000;

const groupMessages = (messages) => {
  var grouped = [];
  messages.forEach((m, i, array) => {
    if (i > 0 &&
        m.author == array[i-1].author &&
        m.stamp - array[i-1].stamp < MERGE_TIME) {
          var oldMsg = grouped[grouped.length-1];
          oldMsg.stamp = m.stamp;
          oldMsg.contents.push(m);
        }
    else {
      grouped.push({
        author: m.author,
        stamp: m.stamp,
        contents: [ m ]
      });
    }
  });

  console.log(grouped);

  return grouped;
}

const File = ({file}) => {
  var name = Path.basename(file);
  var url = `file://${file}`;
  return (
    <div>
      <a href='javascript:void(0)' onClick={(e) => Remote.shell.openExternal(url)}>
        {name}
      </a>
    </div>
  )
}

const Text = ({text}) => (
  <p style={{whiteSpace: 'pre-wrap', margin: '.1em'}}>
    {text}
  </p>
)

const Message = ({m, contacts, profile}) => {
  const stamp = (new Date(m.stamp)).toString();
  const fromMe = (m.author === profile.username);
  const username = (fromMe) ? profile.email : contacts[m.author].email;

  return (
    <Panel
      bsStyle={fromMe ? 'success' : 'info'}
      header={
        <div style={{fontSize: '1em'}}>
          <strong>{username}</strong>
          <p style={{float: 'right', color: '#777'}}>{stamp}</p>
        </div>
    }>
      {m.contents.map((c) => {
        if (c.text) return (<Text key={c.id} {...c} />);
      })}
    </Panel>
  )
}

const Messages = React.createClass({
  scrollToBottom() {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  },
  componentDidMount()  { this.scrollToBottom() },
  componentDidUpdate() { this.scrollToBottom() },
  render() {
    const messages = this.props.messages[this.props.topicId];
    if (!messages) {
      return (<h2>Invalid topic.</h2>);
    }

    return (
      <div style={{
          position: 'absolute',
          top: 0, bottom: 0, left: 0, right: 0,
          overflow: 'auto',
          padding: '10px',
          paddingRight: '15px'
        }}>
        {groupMessages(messages).map(m => {
          return (
            <Message key={m.stamp} m={m} {...this.props} />
          )
        })}
      </div>
    )
  }
});

export default Messages;
