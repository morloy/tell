'use strict';


// Diag
Cryptocat.Diag = {
  message: {}
};

Cryptocat.Diag.message.deviceSetup = function (callback) {
  callback(0);
};
Cryptocat.Diag.message.updatedMyDevices = function (username, callback) {
  callback(1);
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
  Cryptocat.OMEMO.onAddDevice('master', 0);
};



// Roster
Cryptocat.Win.main.roster = {};
(function() {

  Cryptocat.Win.main.roster.state = {
    buddies: {}
  };

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
      var buddy = {
        key: item.jid.local,
        username: item.jid.local,
        subscription: item.subscription,
        status: status
      };
      newBuddies[item.jid.local] = {
        props: buddy
      };
      Cryptocat.XMPP.getAvatar(item.jid.local);
      Cryptocat.XMPP.queryLastSeen(item.jid.local);
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
		setTimeout(function() {
			if (Cryptocat.Me.connected) {
				Cryptocat.XMPP.queryLastSeen(username);
				Cryptocat.XMPP.getAvatar(username);
			}
		}, 2000);
  };

  Cryptocat.Win.updateDeviceManager = function(username) {
    return false;
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
  console.log(info);
  Cryptocat.Storage.addMessage({
    username,
    id,
    fromMe: false,
    text: info.plaintext,
    stamp
  });
};
