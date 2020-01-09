import React from 'react'
import { render } from 'react-dom';
import App from './App'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer from "../redux/reducers"

export const store = createStore(reducer);

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root"))