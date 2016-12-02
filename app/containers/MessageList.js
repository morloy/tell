import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/unread';
import Messages from '../components/Messages';

function mapStateToProps({ messages, contacts, profile, unread }) {
  return {
    messages,
    unread,
    contacts,
    profile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
