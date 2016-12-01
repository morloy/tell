export const ADD_MESSAGE = 'ADD_MESSAGE';

import { getRandomId } from '../utils';
import { addFileToTopic } from '../utils/files';
import { broadcast } from './network';

export const addMessage = (topicId, message) => {
  return {
    type: ADD_MESSAGE,
    topicId,
    message
  }
}

export const sendMessage = (topicId, text) => {
  return (dispatch, getState) => {
    const stamp = Date.now();
    const id = getRandomId();
    const author = getState().profile.username;
    const message = {id, author, text, stamp}

    dispatch(broadcast(addMessage(topicId, message)));
  };
}


export const sendFile = (topicId, path) => {
  return (dispatch, getState) => {
    const name = Path.basename(path);

    FS.readFile(path, (err, data) => {
      if (err) {
         return false;
       }
      Cryptocat.File.send(name, data, function(info) {
        if (!info.valid) {
          return false;
        }
        console.log(`Sending file: ${name}`);
      }, function(url, p) {
        console.log(`Progress: ${p} %`);
      }, function(info, file) {
        var sendInfo = 'CryptocatFile:' + JSON.stringify(info);
        if (info.valid) {
          dispatch(sendMessage(topicId, sendInfo));
          addFileToTopic(topicId, path);
        } else {
          console.log('File not sent');
          return false;
        }
      });
    });
  }
};
