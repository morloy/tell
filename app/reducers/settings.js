import INITIALIZE_PROFILE from '../actions/settings'

export default function chat(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_PROFILE:
      return Object.assign({}, {
        profile: action.profile
      });

    default:
      return state;
  }
}
