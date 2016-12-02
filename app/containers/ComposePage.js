import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goBack } from 'react-router-redux';
import Compose from '../components/Compose';
import * as actions from '../actions/topics';

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions, goBack }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
