import { SELECT_CHAT, ADD_MESSAGE } from '../actions/chat'

const initialState = {
  activeChat: '',
  messages: {}
}

export default function chat(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      var newState = Object.assign({}, state);
      var username = action.message.username;

      if (!newState.messages.hasOwnProperty(username)) {
        newState.messages[username] = [];
      }
      newState.messages[username].push(action.message);

      return newState;

    case SELECT_CHAT:
      return Object.assign({}, state, {
        activeChat: action.username
      })

    default:
      return state;
  }
}
