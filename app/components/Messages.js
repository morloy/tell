import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MDReactComponent from 'markdown-it-react-renderer';
import emoji from 'markdown-it-emoji';
import { checkIfFile } from '../actions/network';
import { getTopicDir } from '../utils/files';
import colors from '../utils/colors';
import {
  Form, Glyphicon, Image,
  Panel, Label, Badge, ProgressBar
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

  return grouped;
}

const Text = ({text}) => {
  // console.log(text);
  return (
    <MDReactComponent
      markdownOptions={{
        linkify: true,
        typographer: true,
        breaks: true
      }}
      plugins={[emoji]}
      convertRules={{
        emoji: ({ content }) => (
            [['emoji', content]]
        )
      }}
      text={text.split('\n\n').join('\n####\n')}
    />
  )
};

const open = (url) => {
  Remote.shell.openExternal(url);
}

const File = ({name, topicId}) => {
  const topicDir = getTopicDir(topicId);
  return (
    <div style={{borderLeft: `2px solid ${colors.blue1}`}}>
    <div style={{float: 'right', color: colors.blue1}}>
      <a href='javascript:void(0)' onClick={(e) => open(`file://${topicDir}`)}>
        <Glyphicon glyph='folder-open' />
      </a>
    </div>
    <div>
      <a href='javascript:void(0)' onClick={(e) => open(`file://${topicDir}/${name}`)}>
        <Glyphicon glyph='file' style={{fontSize: '1.2em', padding: '2px 10px'}} />
        {name}
      </a>
    </div>
  </div>
  )
}

const Message = ({m, contacts, profile, topicId}) => {
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
      const file = checkIfFile(c.text);
      if (file.isFile)
        return <File key={c.id} name={file.file.name} topicId={topicId} />
      else
        return <Text key={c.id} {...c} />;
      })}
    </Panel>
  )
}

const Progress = ({ text, progress }) => (
  <div>
    {text}
    <ProgressBar active now={progress} />
  </div>
);

const ProgessBars = React.createClass({
  getInitialState() {
    return {
      progress: {},
    };
  },
  componentDidMount() {
    window.setProgress = this.setProgress;
  },
  setProgress(id, text, progress) {
    let state = Object.assign({}, this.state);
    if (progress === -1) {
      state.progress[id] = undefined;
    }
    else {
      state.progress[id] = { text, progress };
    }
    this.setState(state);
  },
  render() {
    return  (
      <div>
      {_.map(this.state.progress, (progress, k) => (
        progress ? <Progress key={k} {...progress} /> : ''
      ))}
    </div>
  )}
});

const Messages = React.createClass({
  scrollToBottom() {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  },
  componentDidMount() {
    this.scrollToBottom();
  },
  componentDidUpdate() {
    this.scrollToBottom();
    this.props.markRead(this.props.topicId);
  },
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
        <ProgessBars />
      </div>
    )
  }
});

export default Messages;
