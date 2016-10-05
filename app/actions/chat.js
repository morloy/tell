export const SELECT_CHAT = 'SELECT_CHAT';

export const selectChat = (username) => {
  return {
    type: SELECT_CHAT,
    username
  }
}

export const sendMessage = (username, message) => {
  return (dispatch, getState) => {
    const { messages } = getState().chat;

    if (!messages.hasOwnProperty(username)) {
      const email = getState().settings.profile.email;
      var sendInfo = 'UserProfile:' + JSON.stringify({
        email
      });

      Cryptocat.OMEMO.sendMessage(username, {
        message: sendInfo,
        internalId: 'profile'
      });
    }

    var stamp = Date.now();
    var internalId = `${Cryptocat.Me.username}_${stamp}`;
    console.log({username, message, internalId});

    Cryptocat.OMEMO.sendMessage(username, {
      message: message,
      internalId
    });

    Cryptocat.Storage.addMessage({
      username,
      id: internalId,
      fromMe: true,
      text: message,
      stamp
    });
  };
}
