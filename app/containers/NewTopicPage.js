import React, { Component } from 'react';
import NewTopic from '../components/NewTopic';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/topics';

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTopic);
