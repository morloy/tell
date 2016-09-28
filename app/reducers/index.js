import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import cryptocat from './cryptocat';

const rootReducer = combineReducers({
  cryptocat,
  routing
});

export default rootReducer;
