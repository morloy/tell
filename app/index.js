import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import { persistStore } from 'redux-persist';


const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
Cryptocat.Storage.store = store;

function setup() {
  Cryptocat.XMPP.connect('timo', 'test', function () {
    console.log('connected');
  });
};

persistStore(store, {}, setup);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
