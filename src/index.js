import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';

import './styles/index.scss';

import App from './App';

import firebaseConfig from './helpers/firebase';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
