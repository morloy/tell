export const addContact = (id, profile) => {
  return (dispatch, getState) => {
    const { contacts } = getState();

    if (!contacts.hasOwnProperty(id)) {
      Cryptocat.XMPP.sendBuddyRequest(id);
      Cryptocat.XMPP.getDeviceList(id);
    }

    Cryptocat.Storage.updateContact(id, profile);
  };
}
