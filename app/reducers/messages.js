import _ from 'lodash';

import { ADD_MESSAGE } from '../actions/messages';
import { DELETE_TOPIC } from '../actions/topics';



export default function topics(state = {}, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      var newObj = {};
      if (state.hasOwnProperty(action.topicId)) {
        newObj[action.topicId] = [...state[action.topicId], action.message];
      } else {
        newObj[action.topicId] = [action.message];
      }
      return Object.assign({}, state, newObj);

    case DELETE_TOPIC:
      return _.omit(state, action.topicId);

    default:
      return state;
  }
}
