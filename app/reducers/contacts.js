import { DELETE_CONTACT, CREATE_CONTACT } from '../actions/contacts';

import { omit } from 'lodash';

export default function chat(state = {}, action) {
  switch (action.type) {
    case CREATE_CONTACT:
      var newObj = {};
      newObj[action.userId] = action.profile;
      return Object.assign({}, state, newObj);

    case DELETE_CONTACT:
      return omit(state, action.userId);

    default:
      return state;
  }
}
