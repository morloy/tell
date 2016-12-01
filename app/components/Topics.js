import React, { Component } from 'react';
import MainPage from '../containers/MainPage';
import Chat from './Chat';
import colors from '../utils/colors';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';

const Topic = ({id, subject, active}) => (
  <Link to={`/topics/${id}`} style={{
      padding: '5px 20px',
      display: 'block',
      backgroundColor: active ? colors.blue2 : ''
  }}>
    {subject}
  </Link>
)

const TopicList = ({topics, activeId}) => (
  <div>
    <h4 style={{paddingLeft: '10px'}}>Topics</h4>

    {_.map(topics, (t,id) => (
      <Topic key={id} id={id} {...t} active={activeId === id} />
    ))}

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

const Topics = ({topics, params, sendMessage, sendFile}) => {
  const activeId = params.topicId;
  const Sidebar = <TopicList topics={topics} activeId={activeId} />;

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
