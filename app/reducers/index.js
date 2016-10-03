import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import cryptocat from './cryptocat';
import chat from './chat';
import settings from './settings';
import contacts from './contacts';

const rootReducer = combineReducers({
  cryptocat,
  chat,
  settings,
  contacts,
  routing
});

export default rootReducer;
