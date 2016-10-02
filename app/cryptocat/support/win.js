'use strict';


// Diag
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


// Win
Cryptocat.Win = {
	main: {},
	chat: {},
	chatRetainer: [],
	deviceManager: {},
	setAvatar: {},
	create: {}
};

Cryptocat.Win.create.addDevice = function () {
  return true;
};

Cryptocat.Win.updateDeviceManager = function(username) {
  Cryptocat.Storage.sync();
  return false;
};



// Roster
(function() {

  Cryptocat.Win.main.roster = { state: { buddies: {}}};

  var _buddies = Cryptocat.Win.main.roster.state.buddies;

  Cryptocat.Win.main.roster.buildRoster = function (rosterItems) {
    var newBuddies = {};
    var userBundles = Cryptocat.Me.settings.userBundles;
    rosterItems.forEach(function(item) {
      var status = 0;
      if (
        hasProperty(userBundles, item.jid.local) &&
        Object.keys(userBundles[item.jid.local]).length
      ) {
        status = 1;
      } else {
        Cryptocat.XMPP.getDeviceList(item.jid.local);
      }
      newBuddies[item.jid.local] = {
        props: {
          key: item.jid.local,
          username: item.jid.local,
          subscription: item.subscription,
          status: status
        }
      };
    });
    Object.assign(_buddies, newBuddies);
  };

  Cryptocat.Win.main.roster.getBuddyStatus = function(username) {
		return _buddies[username].props.status;
  };

  Cryptocat.Win.main.roster.updateBuddyStatus = function(username, status, notify) {
		var newBuddies = _buddies;
		if (
			hasProperty(newBuddies, username) &&
			hasProperty(newBuddies[username], 'props') &&
			hasProperty(newBuddies[username].props, 'status') &&
			(newBuddies[username].props.status === status)
		) {
			return false;
		}
		newBuddies[username] = {
      props: {
				key: username,
				username: username,
				subscription: '',
				status: status
      }
		};
    Object.assign(_buddies, newBuddies);
  };

  Cryptocat.Win.main.roster.removeBuddy = function(username) {
    if (!hasProperty(_buddies, username)) {
      return false;
    }
    delete _buddies[username];
    delete Cryptocat.Me.settings.userBundles[username];
    Cryptocat.Storage.sync();
  };


})();


// Chat
(function() {
  var handler = {
    get: function(target, name) {
      return {
        webContents: {
          send: function(channel, internalId) {
            console.log(name);
          }
        }
      };
    }
  };

  Cryptocat.Win.chat = new Proxy({}, handler);
})();


// XMPP
Cryptocat.XMPP.deliverMessage = function(username, info) {
  var stamp = new Date(info.stamp).getTime();
  var id = `${username}_${stamp}`;
  Cryptocat.Storage.addMessage({
    username,
    id,
    fromMe: false,
    text: info.plaintext,
    stamp
  });
};
