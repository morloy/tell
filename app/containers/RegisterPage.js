import React, { Component } from 'react';
import Register from '../components/Register';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/settings';

function mapStateToProps(state) {
  return {
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
