export const ADD_MESSAGE = 'ADD_MESSAGE';

import { getRandomId } from '../utils';

export const addMessage = (topicId, author, text, stamp) => {
  return {
    type: ADD_MESSAGE,
    topicId,
    message: {
      id: getRandomId(),
      author,
      text,
      stamp
    }
  }
}

export const sendMessage = (topicId, text) => {
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
