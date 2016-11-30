import _ from 'lodash';
import { addMessage } from './messages';
import { getRandomId } from '../utils';
import { push } from 'react-router-redux'

export const UPDATE_TOPIC = 'UPDATE_TOPIC';

export const updateTopic = (id, subject, members) => {
  return {
    type: UPDATE_TOPIC,
    id,
    subject,
    members
  }
}

export const createNewTopic = ({to, subject, text}) => {
  return (dispatch, getState) => {
    const contacts = _.pickBy(getState().contacts,
                              (v,k) => to.indexOf(v.email) >= 0);
    const topicId = getRandomId();
    const me = getState().profile.username;
    const stamp = Date.now();

    dispatch(updateTopic(topicId, subject, _.keys(contacts)));
    dispatch(addMessage(topicId, me, text, stamp));
    dispatch(addMessage(topicId, me, text, Date.now()+100));
    dispatch(push(`/topics/${topicId}`));
  };
}

export const sendMessage = (topicId, text) => {
  return (dispatch, getState) => {
    const me = getState().profile.username;
    const stamp = Date.now();
    dispatch(addMessage(topicId, me, text, stamp));
  };
}
