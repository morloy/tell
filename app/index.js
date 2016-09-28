import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import { persistStore } from 'redux-persist';

// localStorage.clear();

const store = configureStore();
window.store = store;
const history = syncHistoryWithStore(hashHistory, store);

function setup() {
  var settings = store.getState().cryptocat;
  if (settings === false) {
    Cryptocat.OMEMO.onAddDevice('master', '');
  }
  console.log(settings.identityKey.priv);
};

persistStore(store, {}, setup);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
