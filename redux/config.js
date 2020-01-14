import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from "./reducers";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userStocks', 'stockData', 'interval']
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
const persistor = persistStore(store);

export default { store, persistor };