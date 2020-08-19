import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import { TodoContainer } from 'app/containers/TodoContainer';
import UIDesigner from 'app/UIDesigner';
import * as style from './App.css';
// render react DOM
export const App = hot(({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={UIDesigner} />
      </Switch>
    </Router>
  );
});
