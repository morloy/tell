import React, { Component } from 'react';
import Register from '../components/Register';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/profile';

function mapStateToProps({ profile, cryptocat }) {
  return {
    profile,
    cryptocat
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
