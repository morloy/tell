import React, { Component } from 'react';
import { Link } from 'react-router';
import Contacts from '../containers/Contacts';

import {
  Form, FormGroup, ControlLabel,
  FormControl, HelpBlock, Button
} from 'react-bootstrap';


const openFile = (file) => {
  var file = 'file:///Users/timoho/Library/Application Support/Electron/files/Faada Freddy - Truth.txt';
  console.log('open');
  Remote.shell.openExternal(file);
}

const File = ({path}) => {
  var name = Path.basename(path);
  var url = `file://${path}`;
  return (
    <a href='javascript:void(0)' onClick={(e) => Remote.shell.openExternal(url)}>
      {name}
    </a>
  )
}

const Message = (m) => (
  <div
    style={{
      textAlign: m.fromMe ? 'left' : 'right'
    }}
  >
    {m.text}
    {m.file ? <File path={m.file} /> : ''}
  </div>
)

const MessageList = ({ messages }) => (
  <div>
    {messages.map(message =>
      <Message key={message.id} {...message} />
    )}
  </div>
)


const MessageInput = React.createClass({
  getInitialState() {
    return {
      text: '',
    };
  },
  handleChange(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();

    var username = this.props.username;
    var stamp = Date.now();
    var id = `${Cryptocat.Me.username}_${stamp}`;
    var text = this.state.text;

    Cryptocat.OMEMO.sendMessage(username, {
      message: text,
  		internalId: id
    });

    Cryptocat.Storage.addMessage({
      username,
      id,
      fromMe: true,
      text,
      stamp
    });
    this.setState({ text: '' });
  },

  sendFile (file) {
    var username = this.props.username;
    var stamp = Date.now();
    var id = `${Cryptocat.Me.username}_${stamp}`;

    FS.readFile(file.path, (err, data) => {
					if (err) { return false; }

          Cryptocat.File.send(file.name, data, function(info) {
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
    				} else {
    					console.log('File not sent');
    					return false;
    				}
    			});
		});
  },

  render() {
    return (
      <Form onSubmit={this.handleSubmit} >
          <FormGroup>
            <FormControl
              type="text"
              value={this.state.text}
              onChange={this.handleChange}
              placeholder="Type your message here ..."
            />
            <Button type="submit">Submit</Button>
        </FormGroup>
        <FormControl
          type="file"
          label="Send File ..."
          onChange={(e) => this.sendFile(e.target.files[0])}
        />
      </Form>
    );
  }
})

const ChatBox = ({ activeChat, messages }) => {
  var renderMessages = messages.hasOwnProperty(activeChat)
                        ? <MessageList messages={messages[activeChat]} />
                        : '';
  return (
    <div>
      {renderMessages}
      <MessageInput username={activeChat} />
    </div>
  )
}

const Chat = React.createClass({
  componentWillMount () {
    var {username, password} = this.props.settings.profile;

    Cryptocat.XMPP.connect(username, password, function () {
      client.subscribeToNode(
				`${Cryptocat.Me.username}@${Cryptocat.Hostname}`,
				'urn:xmpp:omemo:0:devicelist'
			).then((res) => {
        Cryptocat.XMPP.sendDeviceList(Cryptocat.Me.settings.deviceIds);
        Cryptocat.XMPP.sendBundle();
      });
    });
  },
  render() {
    var {username, email} = this.props.settings.profile;
    return (
      <div>
        <div>
          <p>{email} ({username})</p>
          <h2>Chat</h2>
          <Contacts />
          { this.props.chat.activeChat === ''
              ? '' : <ChatBox {...this.props.chat} /> }
        </div>
      </div>
    );
  }
});

export default Chat;
