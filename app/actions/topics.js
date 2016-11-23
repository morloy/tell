import _ from 'lodash';
import basex from 'base-x';
import { addMessage } from './messages';

export const UPDATE_TOPIC = 'UPDATE_TOPIC';

export const updateTopic = (id, subject, members) => {
  return {
    type: UPDATE_TOPIC,
    id,
    subject,
    members
  }
}

const bs58 = basex('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
const assignTopicId = () => {
  return bs58.encode(ProScript.crypto.random16Bytes('o0'));
}

export const createNewTopic = ({to, subject, text}) => {
  return (dispatch, getState) => {
    const contacts = _.pickBy(getState().contacts,
                              (v,k) => to.indexOf(v.email) >= 0);
    const id = assignTopicId();
    const me = getState().profile.username;
    const stamp = Date.now();

    dispatch(updateTopic(id, subject, _.keys(contacts)));
    dispatch(addMessage(id, me, text, stamp));
    dispatch(addMessage(id, me, text, Date.now()+100));
  };
}
