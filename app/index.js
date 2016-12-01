import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import { persistStore } from 'redux-persist';
import ConnectionManager from './components/ConnectionManager';

import { setupCryptocat } from './utils/cryptocat';
import './app.global.css';


const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

persistStore(store, {}, () => {
  setupCryptocat(store);

  if (store.getState().profile.username === undefined) {
    store.dispatch(push('/register'));
  }

  render(
    <div>
      <ConnectionManager {...store.getState().profile} />
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </div>,
    document.getElementById('root')
  );
});
