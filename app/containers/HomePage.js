import React, { Component } from 'react';
import Home from '../components/Home';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

export default connect(mapStateToProps)(Home);
