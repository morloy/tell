import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChat } from '../actions/chat';
import * as actions from '../actions/contacts';
import Contacts from '../components/Contacts';


function mapStateToProps(state) {
  var contacts = Object.keys(state.contacts).map((key) => ({
    id: key,
    ...state.contacts[key]
  }));

  var blockList = [];
  blockList.push(state.profile.email);
  blockList.push(state.profile.username);
  contacts.forEach((c) => {
    blockList.push(c.email);
    blockList.push(c.id);
  });

  return {
    contacts,
    activeChat: state.chat.activeChat,
    profile: state.profile,
    blockList,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
