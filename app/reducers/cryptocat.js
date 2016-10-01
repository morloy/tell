var initialState = Cryptocat.EmptyMe.settings;

var settingUpdateDisallowed = [
  'identityKey',
  'identityDHKey',
  'deviceId',
  'deviceName',
  'deviceIcon'
];

export default function cryptocat(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      var settings = Object.assign({}, action.loadedSettings);
      var newObj = {};

      for (var setting in settings) {
        if (
          hasProperty(settings, setting) &&
          hasProperty(initialState, setting)
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
