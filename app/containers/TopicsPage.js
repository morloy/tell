import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Topics from '../components/Topics';
import * as messageActions from '../actions/messages';
import * as topicsActions from '../actions/topics';

function mapStateToProps({ topics, unread, contacts }) {
  return {
    topics,
    unread,
    contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...messageActions, ...topicsActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
