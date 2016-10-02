import React, { Component } from 'react';
import Chat from '../components/Chat';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChatActions from '../actions/chat';


function mapStateToProps(state) {
  return {
    chat: state.chat,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChatActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
