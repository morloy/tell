import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChat } from '../actions/chat';
import { addContact } from '../actions/contacts';
import ContactList from '../components/ContactList';


function mapStateToProps(state) {
  var contacts = Object.keys(state.contacts).map((key) => ({
    id: key,
    ...state.contacts[key]
  }));

  var blockList = [];
  blockList.push(state.settings.profile.email);
  blockList.push(state.settings.profile.username);
  contacts.forEach((c) => {
    blockList.push(c.email);
    blockList.push(c.id);
  });

  return {
    contacts,
    activeChat: state.chat.activeChat,
    profile: state.settings.profile,
    blockList,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (id, profile) => {
      dispatch(addContact(id, profile));
    },
    onSelectContact: (id) => {
      dispatch(selectChat(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
