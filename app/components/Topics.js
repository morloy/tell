import { Link } from 'react-router';
import { Glyphicon, Jumbotron } from 'react-bootstrap';
import React from 'react';
import MainPage from '../containers/MainPage';
import Chat from './Chat';
import colors from '../utils/colors';

const Topic = ({ topicId, subject, active, read }) => (
  <Link
    to={`/topics/${topicId}`} style={{
      padding: '5px 20px',
      display: 'block',
      backgroundColor: active ? colors.blue2 : '',
      fontWeight: read ? 'normal' : 'bold'
    }}
  >
    {subject}
  </Link>
);

const TopicList = ({ topics, unread, activeId }) => (
  <div>
    <h4 style={{ paddingLeft: '10px' }}>Topics</h4>

    {unread.map(v =>
      <Topic key={v.topicId} {...v} {...topics[v.topicId]} active={activeId === v.topicId} />
    )}

    <Link to="/compose" style={{
        position: 'absolute', bottom: '25px', right: '25px',
        backgroundColor: colors.blue2,
        width: '50px', height: '50px',
        fontSize: '150%',
        padding: '13px',
        borderRadius: '50%'
    }}>
      <Glyphicon glyph="pencil" />
    </Link>
  </div>
)

const TopicHeader = ({ topic, contacts }) => {
  let members = [];
  topic.members.forEach(m => {
    if (contacts[m]) { members = [contacts[m].email, ...members]; }
  });

  return (
    <div style={{ paddingTop: '8px' }}>
      <strong>{topic.subject}</strong><br />
      <span style={{ color: colors.gray }}>{members.join(', ')}</span>
    </div>
  );
};

const Topics = ({ topics, unread, contacts, params, sendMessage, sendFile }) => {
  const activeId = params.topicId;
  const Sidebar = <TopicList topics={topics} unread={unread} activeId={activeId} />;

  if (topics[activeId]) {
    return (
      <MainPage
        SideBar={Sidebar}
        Title={<TopicHeader topic={topics[activeId]} contacts={contacts} />}
        Content={<Chat
          topicId={activeId}
          sendMessage={sendMessage}
          sendFile={sendFile}
        />}
      />
    );
  }

  return (
    <MainPage
      SideBar={Sidebar}
      Content={
        <Jumbotron style={{ height: '100%', margin: 0 }}>
          <h1 style={{ padding: '20px 0px' }}>Welcome to Tell!</h1>
          <p>
            To get started, write some messages to your colleagues.<br />
            Just click on the pen on the left and add your friends by adding their e-mail address.
            It's easy!
          </p>
        </Jumbotron>
      }
    />
  );
};

export default Topics;
