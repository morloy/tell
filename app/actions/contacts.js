export const CREATE_CONTACT = 'CREATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';

export const createContact = (userId, profile) => {
  Cryptocat.XMPP.sendBuddyRequest(userId);
  Cryptocat.XMPP.getDeviceList(userId);

  return {
      type: CREATE_CONTACT,
      userId,
      profile
  };
}

export const deleteContact = (userId) => {
  Cryptocat.XMPP.removeBuddy(userId);

  return {
    type: DELETE_CONTACT,
    userId
  }
}
