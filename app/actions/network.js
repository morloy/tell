import _ from 'lodash';
import { ADD_MESSAGE } from './messages';
import { CREATE_TOPIC } from './topics';
import { createContact } from './contacts';
import { updateBadgeCount } from './unread';
import { getTopicDir } from '../utils/files';
import { getRandomId } from '../utils';


export const send = (userId, message) => (dispatch, getState) => {
  Cryptocat.OMEMO.sendMessage(userId, { message });
};

export const broadcast = (action) => {
  return (dispatch, getState) => {
    dispatch(action);

    const me = getState().profile.username;
    const message = JSON.stringify(action);
    getState().topics[action.topicId].members.forEach(userId => {
      if (userId !== me) { dispatch(send(userId, message)); }
    });
  };
};

export const checkIfFile = (message) => {
  if (Cryptocat.Patterns.file.test(message)) {
    const info = Cryptocat.File.parseInfo(message);
    if (info.valid) {
      return {
        file:	info,
        isFile: true
      };
    }
  }
  return {
    file:	{},
    isFile: false
  };
};

const receiveFile = (topicId, file, callback) => {
  const progressId = getRandomId();
  const progressText = `Receiving file: ${file.name}`;
  const progress = (p) => {
    window.setProgress(progressId, progressText, p);
  };

  progress(0);
  Cryptocat.File.receive(file, (url, p) => {
		progress(p);
  }, (url, plaintext, valid) => {
    progress(-1);
    const topicDir = getTopicDir(topicId);
    const filename = `${topicDir}/${file.name}`;
    FS.writeFile(filename, plaintext, (err) => {
      if (err) throw err;
      callback(filename);
    });
  });
};

const handleCreateTopic = (userId, action) => {
  return (dispatch, getState) => {
    const {contacts} = getState();
    const me = getState().profile.username;

    _.each(action.contacts, (profile, userId) => {
      if (userId !== me && !contacts[userId]) {
        dispatch(createContact(userId, profile));
      }
    });
    dispatch(action);
  }
};

const handleAddMessage = (userId, action) => {
  return (dispatch, getState) => {
    const m = action.message;
    const topic = getState().topics[action.topicId];

    if (userId !== m.author) {
      console.log(`Wrong message author: ${userId} != ${m.author}`);
      return;
    }

    if (!topic) {
      console.log(`Topic ${action.topicId} does not exist.`);
      return;
    }

    if (topic.members.indexOf(userId) === -1) {
      console.log('User not member of topic!');
      return;
    }
    const file = checkIfFile(m.text);
    if (file.isFile) {
      receiveFile(action.topicId, file.file, (filename) => {
        console.log(`Received file: ${filename}`);
        dispatch(action);
      });
    } else {
      const contact = getState().contacts[m.author];
      if (contact) {
        const notif = new Notification(contact.email, {
          body: m.text
        });
      }
      dispatch(action);
      updateBadgeCount(getState().unread);
    }
  };
};

const actionHandler = {
  CREATE_TOPIC: handleCreateTopic,
  ADD_MESSAGE: handleAddMessage
};

export const receive = (userId, info) => (dispatch) => {
  const action = JSON.parse(info.plaintext);
  const handler = actionHandler[action.type];
  if (handler) {
    dispatch(handler(userId, action));
  }
};
