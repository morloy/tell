import { ADD_MESSAGE } from '../actions/messages';


export default function topics(state = {}, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      var newObj = {};
      if (state.hasOwnProperty(action.id)) {
        newObj[action.id] = [...state[action.id], action.message];
      } else {
        newObj[action.id] = [action.message];
      }
      return Object.assign({}, state, newObj);

    default:
      return state;
  }
}
