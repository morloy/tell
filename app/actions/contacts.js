export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

export const addContact = (id, profile) => {
  return (dispatch, getState) => {
    Cryptocat.Storage.updateContact(id, profile);

    const email = getState().profile.email;
    var sendInfo = 'UserProfile:' + JSON.stringify({
      email
    });

    Cryptocat.XMPP.sendBuddyRequest(id);
    Cryptocat.XMPP.getDeviceList(id);

    setTimeout(() => {
      Cryptocat.OMEMO.sendMessage(id, {
        message: sendInfo,
        internalId: 'profile'
      });
    }, 1000);
  };
}

export const updateContact = (id, profile) => {
  return {
    type: UPDATE_CONTACT,
    id,
    profile
  };
}

export const removeContact = (id) => {
  Cryptocat.XMPP.removeBuddy(id);
  return {
    type: REMOVE_CONTACT,
    id
  }
}
