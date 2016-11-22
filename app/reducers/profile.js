import { INITIALIZE_PROFILE } from '../actions/profile'

export default function chat(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_PROFILE:
      return Object.assign({}, action.profile);

    default:
      return state;
  }
}
