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


const store = createStore(
    rootReducer, 
    initialState,
    compose(
        applyMiddleware(ReduxPromise, thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f  
    )
);

// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk, ReduxPromise),
//         window.devToolsExtension ? window.devToolsExtension() : f => f    
//     )  
// );

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>, document.getElementById('app'));