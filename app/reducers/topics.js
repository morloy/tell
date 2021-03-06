import { CREATE_TOPIC, DELETE_TOPIC } from '../actions/topics';
import _ from 'lodash';


export default function topics(state = {}, action) {
  switch (action.type) {
    case CREATE_TOPIC:
      let newObj = {};
      newObj[action.topicId] = {
        subject: action.subject,
        members: _.keys(action.contacts)
      };
      return Object.assign({}, state, newObj);

    case DELETE_TOPIC:
      return _.omit(state, action.topicId);

    default:
      return state;
  }
}
