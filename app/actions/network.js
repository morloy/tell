import { ADD_MESSAGE } from './messages';
import { CREATE_TOPIC } from './topics';
import { createContact } from './contacts';
import _ from 'lodash';

export const send = (userId, message) => {
  return (dispatch, getState) => {
    Cryptocat.OMEMO.sendMessage(userId, {message});
  }
}

export const broadcast = (action) => {
  return (dispatch, getState) => {
    dispatch(action);

    const me = getState().profile.username;
    const message = JSON.stringify(action);
    console.log(message);
    getState().topics[action.topicId].members.forEach(userId => {
      if (userId !== me)
        dispatch(send(userId, message));
    })
  }
}

const checkIfFile = (message) => {
  if (Cryptocat.Patterns.file.test(message)) {
    var info = Cryptocat.File.parseInfo(message);
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

const receiveFile = (file, callback) => {
  Cryptocat.File.receive(file, (url, p) => {
		console.log(`Progress: ${p} %`);
	}, (url, plaintext, valid) => {
    var filename = `${filesPath}/${file.name}`;
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

    if (userId !== m.author) {
      console.log(`Wrong message author: ${userId} != ${m.author}`);
      return;
    }

    if (getState().topics[action.topicId].members.indexOf(userId) === -1) {
      console.log('User not member of topic!');
      return;
    }

    const file = checkIfFile(m.text);
    if (file.isFile) {
      receiveFile(file.file, (filename) => {
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
    }
  };
}

const actionHandler = {
  CREATE_TOPIC: handleCreateTopic,
  ADD_MESSAGE: handleAddMessage
};

export const receive = (userId, info) => {
  return (dispatch, getState) => {
    console.log(info.plaintext);
    const action = JSON.parse(info.plaintext);
    const handler = actionHandler[action.type];
    if (handler) {
      dispatch(handler(userId, action));
    }
  }
}
