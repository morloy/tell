import Main from '../components/Main';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(Main);
