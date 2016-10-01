'use strict';


Cryptocat.Win = {
	main: {},
	chat: {},
	chatRetainer: [],
	deviceManager: {},
	setAvatar: {},
	create: {}
};


Cryptocat.Diag.message.deviceSetup = function (callback) {
  callback(0);
};


// Roster

Cryptocat.Win.main= {
  roster: {
    state: {
      buddies: {}
    }
  }
};

Cryptocat.Win.main.roster.buildRoster = function (rosterItems) {
  var newBuddies = {};
  var userBundles = Cryptocat.Me.settings.userBundles;
  var _t = this;
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
  Object.assign(Cryptocat.Win.main.roster.state.buddies, newBuddies);
};

Cryptocat.Win.main.roster.getBuddyStatus = function(username) {
			return Cryptocat.Win.main.roster.state.buddies[username].props.status;
};
