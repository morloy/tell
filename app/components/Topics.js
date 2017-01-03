import { Link } from 'react-router';
import { Glyphicon, Jumbotron } from 'react-bootstrap';
import React from 'react';
import MainPage from '../containers/MainPage';
import Chat from './Chat';
import colors from '../utils/colors';

const {Menu, MenuItem} = Remote;

const getMembersList = (topic, contacts) => {
  let members = [];
  topic.members.forEach(m => {
    if (contacts[m]) { members = [contacts[m].email, ...members]; }
  });
  return members.join(', ');
};

const Topic = ({ topicId, read, topics, contacts, activeId, deleteTopic }) => {
  const topic = topics[topicId];
  if (!topic) { return null }

  const subject = (topic.subject) ? topic.subject : getMembersList(topic, contacts);
  const active = (activeId === topicId);

  const menu = new Menu()
  menu.append(new MenuItem({label: 'Delete Topic', click: () => {
    deleteTopic(topicId, active);
  }}));
  const contextMenu = (e) => {
    e.preventDefault();
    menu.popup(Remote.getCurrentWindow())
  };

  return (
    <Link
      to={`/topics/${topicId}`} style={{
        padding: '5px 20px',
        display: 'block',
        backgroundColor: active ? colors.blue2 : colors.blue1,
        fontWeight: read ? 'normal' : 'bold'
      }}
      onContextMenu={contextMenu}
    >
      {subject}
    </Link>
  );
};

const TopicList = (props) => (
  <div>
    <h4 style={{ paddingLeft: '10px' }}>Topics</h4>
    <div
      style={{
        position: 'absolute',
        top: 30, bottom: 90, left: 0, right: 0,
        overflow: 'auto'
      }}
    >
      {props.unread.map(v =>
        <Topic key={v.topicId} {...v} {...props} />
      )}
    </div>

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
  const subject = topic.subject ? topic.subject : getMembersList(topic, contacts);
  const info = topic.subject ? getMembersList(topic, contacts) : '';
  return (
    <div style={{ paddingTop: '8px' }}>
      <strong>{subject}</strong><br />
      <span style={{ color: colors.gray }}>{info}</span>
    </div>
  );
};

const Welcome = () => (
  <Jumbotron style={{ height: '100%', margin: 0 }}>
    <h1 style={{ padding: '20px 0px' }}>Welcome to Tell!</h1>
    <p>
      To get started, write some messages to your colleagues.<br />
      Just click on the pen on the left and add your friends by adding their e-mail address.
      It's easy!
    </p>
  </Jumbotron>
);

const Topics = (props) => {
  const activeId = props.params.topicId;
  const activeTopic = props.topics[activeId];
  const Sidebar = <TopicList {...props} activeId={activeId} />;

  if (activeTopic) {
    return (
      <MainPage
        SideBar={Sidebar}
        Title={<TopicHeader {...props} topic={activeTopic} />}
        Content={<Chat {...props} topicId={activeId} />}
      />
    );
  };

  const hasTopics = Object.keys(props.topics).length === 0;
  return (
    <MainPage
      SideBar={Sidebar}
      Content={hasTopics ? <Welcome /> : ''}
    />
  );
};

export default Topics;
