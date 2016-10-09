import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import { persistStore } from 'redux-persist';
import './app.global.css';


const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
Cryptocat.Storage.store = store;

function setup() {
  render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
  );
};

persistStore(store, {}, setup);
