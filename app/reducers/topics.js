import { UPDATE_TOPIC } from '../actions/topics';


export default function topics(state = {}, action) {
  switch (action.type) {
    case UPDATE_TOPIC:
      var newObj = {};
      newObj[action.id] = {
        subject: action.subject,
        members: action.members
      };
      return Object.assign({}, state, newObj);

    default:
      return state;
  }
}
