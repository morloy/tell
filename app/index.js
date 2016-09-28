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
  Cryptocat.Diag.message.deviceSetup = function (callback) {
    callback(0);
  };
  Cryptocat.Win.create = {};
  Cryptocat.Win.create.addDevice = function () {
    Cryptocat.OMEMO.onAddDevice('master', '');
  };

  Cryptocat.OMEMO.setup(function () {
    console.log(Cryptocat.Me.settings.identityKey.priv);
  });
};

persistStore(store, {}, setup);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
