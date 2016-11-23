export const ADD_MESSAGE = 'ADD_MESSAGE';

export const addMessage = (id, author, text, stamp) => {
  return {
    type: ADD_MESSAGE,
    id,
    message: {
      author,
      text,
      stamp
    }
  }
}
