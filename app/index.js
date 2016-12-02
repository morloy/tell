import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import { persistStore } from 'redux-persist';

import { setupCryptocat } from './utils/cryptocat';
import './app.global.css';


const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

persistStore(store, {}, () => {
  setupCryptocat(store);

  const {profile, topics} = store.getState();

  if (profile.username === undefined) {
    store.dispatch(push('/register'));
  }

  render(
    <div>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </div>,
    document.getElementById('root')
  );
});
