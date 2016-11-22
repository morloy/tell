export const setupChat = () => {
  var chatProxy = {
    get: function(target, name) {
      return {
        webContents: {
          send: function(channel, internalId) {
            console.log({channel, name});
          }
        }
      };
    }
  };

  Cryptocat.Win.chat = new Proxy({}, chatProxy);
}
