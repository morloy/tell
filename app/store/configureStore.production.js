import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import { autoRehydrate } from 'redux-persist';

const router = routerMiddleware(hashHistory);

const enhancer = compose(
  applyMiddleware(thunk, router),
  autoRehydrate(),
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
