export default function chat(state = {}, action) {
  switch (action.type) {
    case UPDATE_CONTACT:
      var newObj = {};
      newObj[action.id] = action.profile;
      return Object.assign({}, state, newObj);

    default:
      return state;
  }
}
