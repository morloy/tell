var EmptyMe = Cryptocat.EmptyMe;

var settingUpdateDisallowed = [
  'identityKey',
  'identityDHKey',
  'deviceId',
  'deviceName',
  'deviceIcon'
];

export default function cryptocat(state = false, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      var settings = Object.assign({}, action.loadedSettings);
      var newObj = {};
      if (!state) {
        newObj = Object.assign({}, EmptyMe.settings);
      }

      for (var setting in settings) {
        if (
          hasProperty(settings, setting) &&
          hasProperty(EmptyMe.settings, setting)
        ) {
          if (state && (settingUpdateDisallowed.indexOf(setting) >= 0)) {
            continue;
          }
          newObj[setting] = settings[setting];
        }
      }

      return Object.assign({}, state, newObj);


    default:
      return state;
  }
}
