import React from 'react'
import { render } from 'react-dom';
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import config from '../redux/config'
import Loading from './Loading';


const { store, persistor } = config;

// render the root component to screen
render(
    <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById("root"))