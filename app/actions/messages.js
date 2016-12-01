export const ADD_MESSAGE = 'ADD_MESSAGE';

import { getRandomId } from '../utils';
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
    const author = getState().profile.username
    const message = {id, author, text, stamp}

    dispatch(broadcast(addMessage(topicId, message)));
  };
}
