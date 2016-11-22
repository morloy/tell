import React, { Component } from 'react';
import Home from '../components/Home';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(Home);
