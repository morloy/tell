import React, { Component } from 'react';
import Topics from '../components/Topics';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as actions from '../actions/topics';

function mapStateToProps({topics}) {
  return {
    topics
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
