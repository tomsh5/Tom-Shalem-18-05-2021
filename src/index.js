import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import rootReducer from './reducers/allReducers'
import { SnackbarProvider } from 'notistack';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import './index.scss';
import App from './App';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
      <Provider store={ store }>
      <SnackbarProvider maxSnack={3}>
    <App />
    </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

