import React, { Component } from 'react';
import Messages from '../components/Messages';
import { connect } from 'react-redux';

function mapStateToProps({messages, contacts, profile}) {
  return {
    messages,
    contacts,
    profile
  };
}

export default connect(mapStateToProps)(Messages);
