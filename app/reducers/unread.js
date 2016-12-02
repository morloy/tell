import { PUSH_UNREAD, MARK_READ } from '../actions/unread';

export default function chat(state = [], { type, topicId }) {
  switch (type) {
    case PUSH_UNREAD:
      return [
        { topicId, read: false },
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
