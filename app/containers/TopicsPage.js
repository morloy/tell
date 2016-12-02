import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Topics from '../components/Topics';
import * as messageActions from '../actions/messages';

function mapStateToProps({ topics, unread, contacts }) {
  return {
    topics,
    unread,
    contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(messageActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
