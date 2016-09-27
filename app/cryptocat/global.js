(function() {
'use strict';
var Electron = require('electron');
var NodeCrypto = require('crypto');
var IPCRenderer = Electron.ipcRenderer;
var HTTPS = require('https');
var NodeUrl = require('url');
var Remote = Electron.remote;
var FS = require('fs');
var Dialog = Remote.dialog;
var Path = (function() {
	if (process.platform === 'win32') {
		return (require('path')).win32;
	}
	return require('path');
})();

var Cryptocat = {
	Win: {},
	XMPP: {},
	Diag: {},
	Storage: {},
	OMEMO: {},
	Version: '',
	Update: {},
	Patterns: {},
	Pinning: {},
	Notify: {},
	File: {},
	Recording: {},
	Directories: {}
};

var EmptyMe = {
	username: '',
	avatar: 'xx',
	connected: false,
	settings: {
		identityKey: {
			priv: [],
			pub: []
		},
		identityDHKey: [],
		deviceId: '',
		deviceName: '',
		deviceIcon: 0,
		deviceIds: [],
		signedPreKey: {
			priv: [],
			pub: []
		},
		signedPreKeyId: 0,
		signedPreKeySignature: '',
		preKeys: [],
		userBundles: {},
		trustedOnly: [],
		sounds: true,
		notify: true,
		typing: true,
		status: 0,
		refresh: 0,
		directories: {
			fileSelect: '',
			fileSave: ''
		}
	}
};

var _setImmediate = setImmediate;
var _clearImmediate = clearImmediate;

process.once('loaded', function() {
	global.Cryptocat = Cryptocat;
	global.Cryptocat.EmptyMe = Object.assign(
		{}, EmptyMe
	);
	global.Cryptocat.Me = Object.assign(
		{}, EmptyMe
	);
	Object.freeze(global.Cryptocat.EmptyMe);
	global.NodeCrypto = NodeCrypto;
	global.IPCRenderer = IPCRenderer;
	global.HTTPS = HTTPS;
	global.NodeUrl = NodeUrl;
	global.FS = FS;
	global.Dialog = Dialog;
	global.Path = Path;
	global.Remote = Remote;
	global.proc = {
		platform: process.platform
	};
	global.setImmediate = _setImmediate;
	global.clearImmediate = _clearImmediate;
	global.__gdirname = __dirname;
	global.hasProperty = function(o, p) {
		return ({}).hasOwnProperty.call(o, p);
	};
});

})();
