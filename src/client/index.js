import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, Route, Link, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './app/rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './users/actions/authActions';
import routes from './app/routes';
import ReduxPromise from 'redux-promise';
import logger from 'redux-logger';

const initialState = { 
  active_hospital: [[{ id:123, accounting_number:12345, phone1: '403-555-1212', phone2: "403-555-1222", address: "123 East st. NW" }]] 
};
const store = createStore(
    rootReducer, 
    initialState,
    compose(
        applyMiddleware(ReduxPromise, thunk, logger()),
        window.devToolsExtension ? window.devToolsExtension() : f => f  
    )
);

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>, document.getElementById('app'));