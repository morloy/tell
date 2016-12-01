import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import RegisterPage from './containers/RegisterPage';
import TopicsPage from './containers/TopicsPage';
import ComposePage from './containers/ComposePage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={TopicsPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="compose" component={ComposePage}/>
    <Route path="topics" component={TopicsPage}>
      <Route path="/topics/:topicId" component={TopicsPage}/>
    </Route>
  </Route>
);
