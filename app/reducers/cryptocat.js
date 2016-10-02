var settingUpdateDisallowed = [
  'identityKey',
  'identityDHKey',
  'deviceId',
  'deviceName',
  'deviceIcon'
];

export default function cryptocat(state = {}, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      var settings = Object.assign({}, action.loadedSettings);
      var newObj = Cryptocat.EmptyMe.settings;

      for (var setting in settings) {
        if (
          hasProperty(settings, setting) &&
          hasProperty(newObj, setting)
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
