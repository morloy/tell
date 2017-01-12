import _ from 'lodash';
import { MARK_READ } from '../actions/unread';
import { ADD_MESSAGE } from '../actions/messages';

export default function chat(state = [], { type, topicId, message }) {
  switch (type) {
    case ADD_MESSAGE:
      const firstEntry = {
        topicId,
        read: (message.author === Cryptocat.Me.username)
      };

      if (_.isEqual(state[0], firstEntry)) { return state; }

      return [
        firstEntry,
        ...state.filter(v => v.topicId !== topicId)
      ];

    case MARK_READ:
      return state.map(v => {
        if (v.topicId === topicId) {
          return { topicId, read: true };
        }
        return v;
      });

    default:
      return state;
  }
}
