import React, { Component } from 'react';
import Register from '../components/Register';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/profile';

function mapStateToProps(state) {
  return {
    profile: state.profile
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
