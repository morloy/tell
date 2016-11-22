import { updateContact } from '../../actions/contacts';
import { addMessage, receiveMessage } from '../../actions/chat';
import { updateCryptocat } from '../../actions/cryptocat';

export const setupStorage = (store) => {
  var err = null;
  var EmptyMe = Cryptocat.EmptyMe;

  Cryptocat.Storage = {};

  Cryptocat.Storage.updateContact = function (id, profile) {
  	store.dispatch(updateContact(id, profile));
  };

  Cryptocat.Storage.addMessage = function(message) {
  	store.dispatch(addMessage(message));
  };

  Cryptocat.Storage.updateUser = function(username, loadedSettings, callback) {
  	store.dispatch(updateCryptocat(loadedSettings));
  	callback(err);
  };

  Cryptocat.Storage.sync = function () {
  	store.dispatch(updateCryptocat(Cryptocat.Me.settings));
  };

  Cryptocat.XMPP.deliverMessage = (username, info) => {
    store.dispatch(receiveMessage(username, info));
  };

  Cryptocat.Storage.getUser = function(username, callback) {
  	var newObj = Object.assign({}, EmptyMe.settings);
  	var setting = '';

  	var doc = store.getState().cryptocat;
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
}
