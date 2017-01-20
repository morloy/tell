import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MDReactComponent from 'markdown-it-react-renderer';
import emoji from 'markdown-it-emoji';
import { checkIfFile } from '../actions/network';
import { getTopicDir } from '../utils/files';
import colors from '../utils/colors';
import {
  Form, Glyphicon, Image,
  Panel, Label, Badge, ProgressBar, Well
} from 'react-bootstrap';

import { Grid, Row, Col } from 'react-bootstrap';

export const MERGE_TIME = 1*60*1000;


const MessageList = (props) => {
  const messages = props.messages[props.topicId];
  let out = [];
  let lastDate = new Date(0);
  let lastAuthor = '';
  let lastStamp = 0;

  for (var i = 0, len = messages.length; i < len; i++) {
    const m = messages[i];
    const stamp = new Date(m.stamp);

    if (stamp.getDate() !== lastDate.getDate()) {
      out.push(<DateHeader stamp={stamp} key={`date_${stamp}`} />);
      lastDate = stamp;
    }

    if (m.author !== lastAuthor) {
      out.push(
        <AuthorHeader author={m.author} key={`${m.author}_${stamp}`} {...props} />
      );
      lastAuthor = m.author;
    }

    if (m.stamp - lastStamp >= MERGE_TIME) {
      out.push(<TimeHeader stamp={stamp} key={`time_${stamp}`} />);
      lastStamp = m.stamp;
    }

    const file = checkIfFile(m.text);
    if (file.isFile) {
      out.push(<File key={m.id} name={file.file.name} topicId={props.topicId} />);
    } else {
      out.push(<Text text={m.text} key={m.id} />);
    }
  }

  return (
    <div className="messages" style={{ margin: '0 4em 0 2em' }}>
      {out}
    </div>
  );
};

const DateHeader = ({ stamp }) => (
  <p style={{ textAlign: 'center' }}>
    <Label style={{ backgroundColor: `${colors.background}`}}>
      {stamp.toDateString()}
    </Label>
  </p>
);

const AuthorHeader = ({ author, profile, contacts }) => {
  const fromMe = (author === profile.username);
  const email = fromMe ? profile.email : contacts[author].email;
  return (
    <div style={{
      borderTop: `2px solid ${fromMe ? colors.gray : '#dada74'}`,
      borderRadius: '.5em',
      padding: '.3em .5em',
      margin: '0 -4em 0 -2em'
    }}>
      <div style={{ float: 'right', color: '#999', fontFamily: 'Consolas' }}>
        {author}
      </div>
      <div style={{ fontWeight: 'bold'}}>
        {email}
      </div>
    </div>
  );
};

const TimeHeader = ({ stamp }) => {
  const padZero = (n) => ("0" + n).slice(-2);
  const hh = padZero(stamp.getHours());
  const mm = padZero(stamp.getMinutes());
  return (
    <p style={{ clear: 'right', float: 'right', margin: '0 -4em 0 1em' }}>
      <Label style={{ backgroundColor: `${colors.blue2}` }}>
        {hh}:{mm}
      </Label>
    </p>
  );
};

const Text = ({text}) => {
  return (
    <MDReactComponent
      markdownOptions={{
        linkify: true,
        typographer: true,
        breaks: true
      }}
      plugins={[emoji]}
      convertRules={{
        emoji: ({ content }) => {
          if (process.platform === 'darwin') {
            return [['span', { className: 'emoji' }, content]];
          }

          return [['img', {
            src: `assets/img-apple-64/${content.codePointAt(0).toString(16)}.png`,
            className: 'emoji'
          }]];
        }
      }}
      text={text}
    />
  )
};

const File = ({name, topicId}) => {
  const open = (url) => {
    Remote.shell.openExternal(url);
  }
  const topicDir = getTopicDir(topicId);
  return (
    <p style={{borderLeft: `2px solid ${colors.blue1}`}}>
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
  </p>
  )
};

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

const SecurityInfo = () => (
  <Well>
    <p>
      <Glyphicon glyph="lock" style={{ fontSize: '2em', float: 'left', paddingRight: '.5em' }} />
      All messages in this chat are <strong>end-to-end encrypted</strong> using the <a href="https://en.wikipedia.org/wiki/Signal_Protocol">Signal Protocol</a>,
      implementation based on <a href="https://crypto.cat/security.html">Cryptocat</a>.
    </p>
    <div>
      <Glyphicon glyph="text-size" style={{ fontSize: '2em', float: 'left', paddingRight: '.5em' }} />
      You can use <a href="https://markdown-it.github.io/">Markdown</a> to format your messages, directly paste links and easily send files.
      A wide variety of <a href="http://www.webpagefx.com/tools/emoji-cheat-sheet/">Emojis</a> is also supported!
    </div>
  </Well>
)

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
        <SecurityInfo />
        <MessageList {...this.props} />
        <ProgessBars />
      </div>
    )
  }
});

export default Messages;
