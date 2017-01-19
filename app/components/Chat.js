import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import MessageList from '../containers/MessageList';
import colors from '../utils/colors';
import {
  Form, FormGroup, ControlLabel,
  FormControl, HelpBlock, Button, Glyphicon, Image,
  Panel
} from 'react-bootstrap';

import { Grid, Row, Col } from 'react-bootstrap';

const MessageInput = React.createClass({
  getInitialState() {
    return {
      text: '',
    };
  },

  handleChange(e) {
    this.setState({ text: e.target.value });
  },
  handleKeyDown(e) {
    if (e.keyCode == 13 && (e.metaKey || e.ctrlKey)) {
      this.handleSubmit(e);
    }
  },
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text === '') return;

    this.props.sendMessage(this.state.text);
    this.setState({ text: '' });
  },

  selectFile() {
    const files = Remote.dialog.showOpenDialog({
      properties: ['openFile']
    })
    if (files) {
      files.forEach((file) => {
        this.props.sendFile(file);
      });
    }
  },
  render() {
    const sendKey = (process.platform === 'darwin') ? '⌘' : 'Ctrl';
    return (
      <div style={{ padding: '5px' }}>
      <Form onSubmit={this.handleSubmit} >
          <FormGroup style={{display: 'table', width: '100%', margin: 0}}>
              <div style={{display: 'table-row'}}>
                <FormControl
                  componentClass="textarea"
                  rows="8"
                  value={this.state.text}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  placeholder="Type your message here ..."
                  style={{width: '100%', marginBottom: '5px'}}
                />
              </div>
              <div style={{display: 'table-row'}}>
                <Button
                  onClick={this.selectFile}
                  style={{ width: '100px' }}
                >
                  <Glyphicon glyph="paperclip" />
                </Button>
                <div style={{ float: 'right', color: '#666' }}>
                  Press {sendKey}+Enter to send message
                  <Button type="submit" style={{ width: '100px', marginLeft: '10px' }}>
                    <Glyphicon glyph="chevron-right" />
                  </Button>
                </div>
              </div>
        </FormGroup>

      </Form>
    </div>
    );
  }
})

const Chat = (props) => (
  <div style={{ display: 'table', height: '100%', width: '100%' }}>
    <div style={{ display: 'table-row', height: '100%' }}>
      <div style={{ position: 'relative', height: '100%' }}>
        <MessageList {...props} />
      </div>
    </div>
    <div style={{ display: 'table-row' }}>
      <MessageInput
        sendMessage={(text) => props.sendMessage(props.topicId, text)}
        sendFile={(file) => props.sendFile(props.topicId, file)}
      />
    </div>
  </div>
);

export default Chat;
