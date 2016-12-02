import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import cryptocat from './cryptocat';
import chat from './chat';
import profile from './profile';
import contacts from './contacts';
import topics from './topics';
import messages from './messages';
import unread from './unread';

const rootReducer = combineReducers({
  cryptocat,
  chat,
  topics,
  messages,
  unread,
  profile,
  contacts,
  routing
});

export default rootReducer;
