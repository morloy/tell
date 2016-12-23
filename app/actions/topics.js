import _ from 'lodash';
import { push } from 'react-router-redux';
import { sendMessage } from './messages';
import { getRandomId } from '../utils';
import { broadcast } from './network';
import { pushUnread, markRead } from './unread';

export const CREATE_TOPIC = 'CREATE_TOPIC';
export const DELETE_TOPIC = 'DELETE_TOPIC';

export const createTopic = (topicId, subject, contacts) => {
  return {
    type: CREATE_TOPIC,
    topicId,
    subject,
    contacts
  };
};

export const deleteTopic = (topicId, isActive) => {
  return (dispatch, getState) => {
    dispatch(sendMessage(topicId, '**The user has deleted the topic and will not receive any messages sent here.**'));

    dispatch({
      type: DELETE_TOPIC,
      topicId
    });

    if (isActive) { dispatch(push('/')); }
  };
};

export const createNewTopic = ({to, subject, text}) => {
  return (dispatch, getState) => {
    const me = getState().profile;

    const topicId = getRandomId();
    let contacts = _.pickBy(getState().contacts, (v,k) => to.indexOf(v.email) >= 0);
    contacts[me.username] = { email: me.email };

    dispatch(pushUnread(topicId));
    dispatch(markRead(topicId));
    dispatch(broadcast(createTopic(topicId, subject, contacts)));
    dispatch(sendMessage(topicId, text));
    dispatch(push(`/topics/${topicId}`));
  };
}
