import { Link } from 'react-router';
import { Glyphicon } from 'react-bootstrap';
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

const Topics = ({ topics, unread, params, sendMessage, sendFile }) => {
  const activeId = params.topicId;
  const Sidebar = <TopicList topics={topics} unread={unread} activeId={activeId} />;

  if (topics[activeId]) {return (
      <MainPage
        SideBar={Sidebar}
        Title={<h3>{topics[activeId].subject}</h3>}
        Content={<Chat
          topicId={activeId}
          sendMessage={sendMessage}
          sendFile={sendFile}
        />}
      />
  )} else {return (
    <MainPage
      SideBar={Sidebar}
    />
  )}
}

export default Topics;
