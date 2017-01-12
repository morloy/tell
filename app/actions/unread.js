export const MARK_READ = 'MARK_READ';

export const markRead = (topicId) => {
  return (dispatch, getState) => {
    let needsAction = false;
    getState().unread.forEach(v => {
      if (v.topicId === topicId && v.read === false) {
        needsAction = true;
      }
    });

    if (needsAction) {
      dispatch({
        type: MARK_READ,
        topicId
      });
    }
  };
};
