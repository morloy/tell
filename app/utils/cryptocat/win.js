export const setupWin = () => {

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
  Cryptocat.Win.main.roster = { state: { buddies: {}}};

  var buddies = Cryptocat.Win.main.roster.state.buddies;

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
    Object.assign(buddies, newBuddies);
  };

  Cryptocat.Win.main.roster.getBuddyStatus = function(username) {
		return buddies[username].props.status;
  };

  Cryptocat.Win.main.roster.updateBuddyStatus = function(username, status, notify) {
		var newBuddies = buddies;
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
    Object.assign(buddies, newBuddies);
  };

  Cryptocat.Win.main.roster.removeBuddy = function(username) {
    if (!hasProperty(buddies, username)) {
      return false;
    }
    delete buddies[username];
    delete Cryptocat.Me.settings.userBundles[username];
    Cryptocat.Storage.sync();
  };
};
