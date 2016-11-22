import { REMOVE_CONTACT, UPDATE_CONTACT } from '../actions/contacts';

import { omit } from 'lodash';

export default function chat(state = {}, action) {
  switch (action.type) {
    case UPDATE_CONTACT:
      var newObj = {};
      newObj[action.id] = action.profile;
      return Object.assign({}, state, newObj);

    case REMOVE_CONTACT:
      return omit(state, action.id);

    default:
      return state;
  }
}
