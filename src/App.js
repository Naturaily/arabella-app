import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Login from './views/Login';
import Repos from './views/Repos';
import NoMatch from './views/NoMatch';

const App = () => {
  const ProtectedRoute = () => (
    <Route
      render={() => (
        (localStorage.getItem('token') !== null && localStorage.getItem('token') !== '')
          ? <Repos />
          : <Redirect to="/login" />
      )}
    />
  );

  const PublicRoute = () => (
    <Route
      render={() => (
        (localStorage.getItem('token') === null || localStorage.getItem('token') === '')
          ? <Login />
          : <Redirect to="/repos" />
      )}
    />
  );

  return (
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to="login" /></Route>
        <PublicRoute path="/login" />
        <ProtectedRoute path="/repos" />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(App);
