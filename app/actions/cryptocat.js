export const UPDATE_CRYPTOCAT = 'UPDATE_CRYPTOCAT';


export const updateCryptocat = (loadedSettings) => {
  return {
    type: UPDATE_CRYPTOCAT,
    loadedSettings
  };
};
