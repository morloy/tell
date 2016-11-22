export const SELECT_CHAT = 'SELECT_CHAT';
export const ADD_MESSAGE = 'ADD_MESSAGE';

import { updateContact } from './contacts';

export const selectChat = (username) => {
  return {
    type: SELECT_CHAT,
    username
  }
}

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    message
  };
};

export const sendMessage = (username, message) => {
  return (dispatch, getState) => {
    var stamp = Date.now();
    var internalId = `${Cryptocat.Me.username}_${stamp}`;
    console.log({username, message, internalId});

    Cryptocat.OMEMO.sendMessage(username, {
      message: message,
      internalId
    });

    dispatch(addMessage({
      username,
      id: internalId,
      fromMe: true,
      text: message,
      stamp
    }));
  };
}


const filesPath = `${Remote.app.getPath('downloads')}/Tell`;
FS.access(filesPath, FS.F_OK, function(err) {
  if (err) {
    FS.mkdir(filesPath);
  }
});

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
    var filename = `${_filesPath}/${file.name}`;
    FS.writeFile(filename, plaintext, (err) => {
      if (err) throw err;
      callback(filename);
    });
	});
};

export const receiveMessage = (username, info) => {
  return (dispatch, getState) => {
    var stamp = new Date(info.stamp).getTime();
    var id = `${username}_${stamp}`;
    var file = checkIfFile(info.plaintext);

    if (info.plaintext.substr(0,12) === 'UserProfile:') {
      var profile = JSON.parse(info.plaintext.substr(12));
      dispatch(updateContact(username, profile));
    } else if (file.isFile) {
      receiveFile(file.file, (filename) => {
        dispatch(addMessage({
          username,
          id,
          fromMe: false,
          text: '',
          file: filename,
          stamp
        }));
      });
    } else {
      var {contacts} = getState();
      if (contacts.hasOwnProperty(username)) {
        var notif = new Notification(contacts[username].email, {
          body: info.plaintext
        });
      }

      dispatch(addMessage({
        username,
        id,
        fromMe: false,
        text: info.plaintext,
        stamp
      }));
    }
  };
};
