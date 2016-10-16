export const REMOVE_CONTACT = 'REMOVE_CONTACT';

export const addContact = (id, profile) => {
  return (dispatch, getState) => {
    Cryptocat.Storage.updateContact(id, profile);

    const email = getState().settings.profile.email;
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

export const removeContact = (id) => {
  return {
    type: REMOVE_CONTACT,
    id
  }
}
