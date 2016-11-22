import { UPDATE_CRYPTOCAT } from '../actions/cryptocat'


const settingUpdateDisallowed = [
  'identityKey',
  'identityDHKey',
  'deviceId',
  'deviceName',
  'deviceIcon'
];

const validSettings = Cryptocat.EmptyMe.settings;

export default function cryptocat(state = {}, action) {
  switch (action.type) {
    case UPDATE_CRYPTOCAT:
      var settings = Object.assign({}, action.loadedSettings);
      var newObj = {};
      const firstRun = Object.keys(state).length === 0;

      for (var setting in settings) {
        if (
          hasProperty(settings, setting) &&
          hasProperty(validSettings, setting)
        ) {
          if (!firstRun && (settingUpdateDisallowed.indexOf(setting) >= 0)) {
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
