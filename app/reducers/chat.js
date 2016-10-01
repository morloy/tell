export default function chat(state = {}, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      var newState = Object.assign({}, state);
      var username = action.message.username;

      if (!newState.hasOwnProperty(username)) {
        newState[username] = [];
      }
      newState[username].push(action.message);

      return newState;

    default:
      return state;
  }
}
