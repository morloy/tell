import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChat } from '../actions/chat';
import { addContact } from '../actions/contacts';
import ContactList from '../components/ContactList';


function mapStateToProps(state) {
  var blockedEmails = state.contacts.map((c) => c.email);
  blockedEmails.push(state.settings.profile.email);

  return {
    contacts: state.contacts,
    activeChat: state.chat.activeChat,
    blockedEmails,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => {
      dispatch(addContact(contact));
      Cryptocat.XMPP.sendBuddyRequest(contact.id);
    },
    onSelectContact: (id) => {
      dispatch(selectChat(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
