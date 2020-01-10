import {
    ACTION_TOGGLE_OVERLAY_VISIBILITY,
    ACTION_UPDATE_SEARCH_SUGGESTIONS_ADD,
    ACTION_ADD_STOCK,
    ACTION_TOGGLE_CONFIRMATION,
    ACTION_TOGGLE_DATA_LOADING,
    ACTION_UPDATE_STOCK_DATA,
    ACTION_TOGGLE_LEFT_ACTIVE,
    ACTION_TOGGLE_RIGHT_ACTIVE,
    ACTION_UPDATE_INDEX,
    ACTION_ADD_STOCK_DATA,
} from './actions'
import { combineReducers } from 'redux';

const overlayVisibilityReducer = (state = false, action) => {
    if (action.type === ACTION_TOGGLE_OVERLAY_VISIBILITY) {
        return !state
    }
    return state;
}

const searchSuggestionsReducer = (state = {
    add: {},
    search: {}
}, action) => {
    if (action.type === ACTION_UPDATE_SEARCH_SUGGESTIONS_ADD) {
        return { ...state, add: action.payload }
    }
    return state
}

const userStocksReducer = (state = [], action) => {
    if (action.type === ACTION_ADD_STOCK) {
        return [...state, action.payload]
    }
    return state
}

const confirmationReducer = (state = false, action) => {
    if (action.type === ACTION_TOGGLE_CONFIRMATION) {
        return !state;
    }
    return state;
}

export const stockLoadingReducer = (state = false, action) => {
    if (action.type === ACTION_TOGGLE_DATA_LOADING) {
        return !state
    }
    return state;
}

export const stockDataReducer = (state = [], action) => {
    if (action.type === ACTION_UPDATE_STOCK_DATA) {
        return action.payload
    } else if (action.type === ACTION_ADD_STOCK_DATA) {
        return [...state, action.payload]
    }
    return state;
}

export const leftActiveReducer = (state = false, action) => {
    return action.type === ACTION_TOGGLE_LEFT_ACTIVE ? !state : state
}

export const rightActiveReducer = (state = false, action) => {
    return action.type === ACTION_TOGGLE_RIGHT_ACTIVE ? !state : state
}


export const IndexReducer = (state = 0, action) => {
    return action.type === ACTION_UPDATE_INDEX ? action.payload : state
}

export default combineReducers({
    overlayVisibility: overlayVisibilityReducer,
    searchSuggestions: searchSuggestionsReducer,
    userStocks: userStocksReducer,
    confirmation: confirmationReducer,
    stocksLoading: stockLoadingReducer,
    stockData: stockDataReducer,
    leftActive: leftActiveReducer,
    rightActive: rightActiveReducer,
    index: IndexReducer,
});