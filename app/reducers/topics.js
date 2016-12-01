import { CREATE_TOPIC } from '../actions/topics';
import _ from 'lodash';


export default function topics(state = {}, action) {
  switch (action.type) {
    case CREATE_TOPIC:
      var newObj = {};
      newObj[action.topicId] = {
        subject: action.subject,
        members: _.keys(action.contacts)
      };
      return Object.assign({}, state, newObj);

    default:
      return state;
  }
}
