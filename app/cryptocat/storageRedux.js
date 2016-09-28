'use strict';

Cryptocat.Storage = {};

var UPDATE_SETTINGS = 'UPDATE_SETTINGS';

(function() {
	var err = null;

	var updateSettings = (loadedSettings) => {
	  return {
	    type: UPDATE_SETTINGS,
	    loadedSettings
	  }
	};

	Cryptocat.Storage.updateUser = function(username, loadedSettings, callback) {
		window.store.dispatch(updateSettings(loadedSettings));
		callback(err);
	};

	Cryptocat.Storage.getUser = function(username, callback) {
		var newObj = Object.assign({}, EmptyMe.settings);
		var setting = '';

		var doc = window.store.getState().cryptocat;
		if (!doc) {
			callback(err, null);
			return false;
		}

		for (setting in newObj) {
			if (
				hasProperty(EmptyMe.settings, setting) &&
				hasProperty(doc, setting)
			) {
				newObj[setting] = doc[setting];
			}
		}
		callback(err, newObj);
	};


	var EmptyCommon = {
		_id: '*common*',
		mainWindowBounds: {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		rememberedLogin: {
			username: '',
			password: ''
		}
	};

	Cryptocat.Storage.getCommon = function(callback) {
		console.log('Dummy Cryptocat.Storage.getCommon');
		var newObj = Object.assign({}, EmptyCommon);
		callback(err, newObj);
	};

	Cryptocat.Storage.updateCommon = function(common, callback) {
		console.log('Dummy Cryptocat.Storage.updateCommon');
		callback(err);
	};

	Cryptocat.Storage.deleteUser = function(username, callback) {
		console.log('Dummy Cryptocat.Storage.deleteUser');
		callback(err);
	};


})();
