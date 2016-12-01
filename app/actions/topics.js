import _ from 'lodash';
import { sendMessage } from './messages';
import { getRandomId } from '../utils';
import { broadcast } from './network';
import { push } from 'react-router-redux';

export const CREATE_TOPIC = 'CREATE_TOPIC';

export const createTopic = (topicId, subject, contacts) => {
  return {
    type: CREATE_TOPIC,
    topicId,
    subject,
    contacts
  }
}

export const createNewTopic = ({to, subject, text}) => {
  return (dispatch, getState) => {
    const me = getState().profile;

    const topicId = getRandomId();
    var contacts = _.pickBy(getState().contacts, (v,k) => to.indexOf(v.email) >= 0);
    contacts[me.username] = { email: me.email };

    dispatch(broadcast(createTopic(topicId, subject, contacts)));

    dispatch(push(`/topics/${topicId}`));
    dispatch(sendMessage(topicId, text));
  };
}
