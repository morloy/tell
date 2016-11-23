import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import RegisterPage from './containers/RegisterPage';
import ChatPage from './containers/ChatPage';
import HomePage from './containers/HomePage';
import NewTopicPage from './containers/NewTopicPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={NewTopicPage} />
    <Route path="/register" component={RegisterPage} />
    <Route path="/chat" component={ChatPage} />
    <Route path="/create" component={NewTopicPage} />
  </Route>
);
