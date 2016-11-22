import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import cryptocat from './cryptocat';
import chat from './chat';
import profile from './profile';
import contacts from './contacts';

const rootReducer = combineReducers({
  cryptocat,
  chat,
  profile,
  contacts,
  routing
});

export default rootReducer;
