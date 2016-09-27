import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import RegisterPage from './containers/RegisterPage';
import HomePage from './containers/HomePage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/register" component={RegisterPage} />
  </Route>
);
