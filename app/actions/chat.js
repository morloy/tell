export const SELECT_CHAT = 'SELECT_CHAT';

export const selectChat = (username) => {
  return {
    type: SELECT_CHAT,
    username
  }
}
