import React from 'react'
import { render } from 'react-dom';
import App from './App'
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import reducer from "../redux/reducers"

// TODO:remove this line before production build
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root"))