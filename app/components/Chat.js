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
import Connecting from './Connecting';

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
    if (e.keyCode == 13 && e.shiftKey) {
      this.handleSubmit(e);
    }
  },
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text === '') return;

    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  },

  selectFile() {
    Remote.dialog.showOpenDialog({
      properties: ['openFile']
    }).forEach((file) => {
      this.sendFile(file);
    });
  },
  sendFile(path) {
    var username = this.props.username;
    var stamp = Date.now();
    var id = `${Cryptocat.Me.username}_${stamp}`;
    var name = Path.basename(path);

    FS.readFile(path, (err, data) => {
					if (err) { return false; }

          Cryptocat.File.send(name, data, function(info) {
    				if (!info.valid) {
    					return false;
    				}
    				var sendInfo = 'CryptocatFile:' + JSON.stringify(info);
            console.log({
    					plaintext: sendInfo,
    					valid: true,
    					stamp: stamp
    				});
    			}, function(url, p) {
            console.log(`Progress: ${p} %`);
    			}, function(info, file) {
    				var sendInfo = 'CryptocatFile:' + JSON.stringify(info);
    				if (info.valid) {
              Cryptocat.OMEMO.sendMessage(username, {
    						message: sendInfo,
    						internalId: id
    					});

              Cryptocat.Storage.addMessage({
                username,
                id,
                fromMe: true,
                text: '',
                file: path,
                stamp
              });
    				} else {
    					console.log('File not sent');
    					return false;
    				}
    			});
		});
  },

  render() {
    return (
      <div style={{backgroundColor: colors.gray, padding: '5px'}}>
      <Form onSubmit={this.handleSubmit} >
          <FormGroup style={{display: 'table', width: '100%', margin: 0}}>
              <div style={{display: 'table-cell'}}>
                <FormControl
                  componentClass="textarea"
                  rows="7"
                  value={this.state.text}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  placeholder="Type your message here. Press Shift+Enter to send."
                  style={{width: '100%'}}
                />
              </div>
              <div style={{display: 'table-cell', width: '40px'}}>
                <Button onClick={this.selectFile}><Glyphicon glyph="paperclip" /></Button>
                <Button type="submit"><Glyphicon glyph="chevron-right" /></Button>
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
      <MessageInput onSubmit={(text) => props.sendMessage(props.topicId, text)} />
    </div>
  </div>
);

export default Chat;
