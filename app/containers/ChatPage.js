import React, { Component } from 'react';
import Chat from '../components/Chat';
import { connect } from 'react-redux';


function mapStateToProps(state) {
  return {
    chat: state.chat
  };
}

export default connect(mapStateToProps)(Chat);
