import {
    ACTION_TOGGLE_OVERLAY_VISIBILITY, ACTION_UPDATE_SEARCH_SUGGESTIONS_ADD
    , ACTION_ADD_STOCK
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

export default combineReducers({
    overlayVisibility: overlayVisibilityReducer,
    searchSuggestions: searchSuggestionsReducer,
    userStocks: userStocksReducer
});