import { INITIALIZE_PROFILE } from '../actions/settings'

const initialState = {}

export default function chat(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_PROFILE:
      return Object.assign({}, {
        profile: action.profile
      });

    default:
      return state;
  }
}
