import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChatActions from '../actions/chat';
import ContactList from '../components/ContactLIst';


function mapStateToProps(state) {
  return {
    contacts: Object.keys(state.cryptocat.userBundles),
    activeChat: state.chat.activeChat
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChatActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
