import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import cryptocat from './cryptocat';
import chat from './chat';

const rootReducer = combineReducers({
  cryptocat,
  chat,
  routing
});

export default rootReducer;
