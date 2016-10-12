import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Contacts from '../containers/Contacts';
import { colors } from '../utils/colors';
import {
  Form, FormGroup, ControlLabel,
  FormControl, HelpBlock, Button, Glyphicon, Image,
  Panel
} from 'react-bootstrap';

import { Grid, Row, Col } from 'react-bootstrap';

const File = ({file}) => {
  var name = Path.basename(file);
  var url = `file://${file}`;
  return (
    <a href='javascript:void(0)' onClick={(e) => Remote.shell.openExternal(url)}>
      {name}
    </a>
  )
}

const Text = ({text}) => (
  <p style={{whiteSpace: 'pre-wrap', margin: '.1em'}}>
    {text}
  </p>
)

const Message = (m) => {
  var stamp = new Date(m.stamp);
  var title = (
    <div style={{fontSize: '1em'}}>
      <strong>{m.username}</strong>
      <p style={{float: 'right', color: '#777'}}>{stamp.toString()}</p>
    </div>
  )
  return (
    <Panel
      header={title}
      bsStyle={m.fromMe ? 'success' : 'info'}
    >
      {m.contents.map((c) => {
        if (c.file) return (<File key={c.id} {...c} />);
        if (c.text) return (<Text key={c.id} {...c} />);
      })}
    </Panel>
  )
}

const MessageList = React.createClass({
  scrollToBottom() {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  },
  componentDidMount()  { this.scrollToBottom() },
  componentDidUpdate() { this.scrollToBottom() },
  render() {
    return (
      <div style={{
          position: 'absolute',
          top: 0, bottom: 0, left: 0, right: 0,
          overflow: 'auto',
          padding: '10px',
          paddingRight: '15px'
        }}>
        {this.props.messages.map(message =>
          <Message key={message.id} {...message} />
        )}
      </div>
    )
  }
});

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

    this.props.onSubmit(this.props.username, this.state.text);
    this.setState({ text: '' });
  },

  selectFile() {
    Remote.dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
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

const ChatBox = ({ chat, sendMessage, messages }) => {
  const { activeChat } = chat;
  var renderMessages = messages.length ? <MessageList messages={messages} /> : '';
  return (
    <div style={{ display: 'table', height: '100%', width: '100%' }}>
      <div style={{ display: 'table-row', height: '100%' }}>
        <div style={{ position: 'relative', height: '100%' }}>
          {renderMessages}
        </div>
      </div>
      <div style={{ display: 'table-row' }}>
        <MessageInput username={activeChat} onSubmit={sendMessage} />
      </div>
    </div>
  )
}

const Chat = React.createClass({
  componentWillMount () {
    var {username, password} = this.props.settings.profile;

    Cryptocat.XMPP.connect(username, password, function (s) {
      if (s) {
        client.subscribeToNode(
  				`${Cryptocat.Me.username}@${Cryptocat.Hostname}`,
  				'urn:xmpp:omemo:0:devicelist'
  			).then((res) => {
          Cryptocat.XMPP.sendDeviceList(Cryptocat.Me.settings.deviceIds);
          Cryptocat.XMPP.sendBundle();

          window.onbeforeunload = (e) => {
            Cryptocat.XMPP.disconnect(false);
            Cryptocat.Storage.sync();
          }
        });
        console.log("Connected.");
      } else {
        console.log("Connection broken.");
      }
    });
  },
  render() {
    var {username, email} = this.props.settings.profile;
    var {activeChat} = this.props.chat;
    return (
      <Grid style={{
          display: 'table',
          height: '100vh', width: '100vw',
          padding: 0
      }}>
        <Row style={{display: 'table-row'}}>
          <Col md={3} style={{backgroundColor: colors.blue1, padding: '10px'}}>
            <Image style={{width: '130px'}} src="img/logo/logo.svg" responsive />
          </Col>
          <Col md={9}>
            <h3>{ activeChat ? this.props.contacts[activeChat].email : ''}</h3>
          </Col>
        </Row>
        <Row style={{display: 'table-row', height: '100%'}}>
          <Col md={3} style={{height: '100%', padding: 0}}>
            <Contacts />
          </Col>
          <Col md={9} style={{
              backgroundColor: 'white',
              color: 'black',
              height: '100%',
              padding: 0
            }}>
            { activeChat === ''
                ? '' : <ChatBox {...this.props} /> }
          </Col>
        </Row>
      </Grid>
    );
  }
});

export default Chat;
