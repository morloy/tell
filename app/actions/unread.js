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
      updateBadgeCount(getState().unread);
    }
  };
};

export const updateBadgeCount = (unread) => {
  const unreadTopics = unread.reduce((sum, v) => (
   v.read === false ? sum + 1 : sum
  ), 0);
  Remote.app.setBadgeCount(unreadTopics);
}
