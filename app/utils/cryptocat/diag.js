export const setupDiag = () => {
  Cryptocat.Diag = {
    message: {}
  };

  Cryptocat.Diag.message.deviceSetup = function(callback) {
    callback(0);
  };
  Cryptocat.Diag.message.updatedMyDevices = function(username, callback) {
    callback(1);
  };

  Cryptocat.Diag.message.addBuddyRequest = function(username, callback) {
    callback(0);
  };

  Cryptocat.Diag.message.buddyUnsubscribed = function (username) {
    return 0;
  };
}
