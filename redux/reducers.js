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
    ACTION_UPDATE_SEARCH_SUGGESTIONS,
    ACTION_UPDATE_DETAIL_ACTIVE,
} from './actions'
import { combineReducers } from 'redux';

/* Reducers */

const confirmationReducer = (state = false, action) => {
    if (action.type === ACTION_TOGGLE_CONFIRMATION) {
        return !state;
    }
    return state;
}

const detailReducer = (state = {
    active: false,
    symbol: '',
    name: '',
    data: []
}, action) => {
    if (action.type === ACTION_UPDATE_DETAIL_ACTIVE) {
        return { ...state, ...action.payload }
    }
    return state;
}

const IndexReducer = (state = 0, action) => {
    return action.type === ACTION_UPDATE_INDEX ? action.payload : state
}

const leftActiveReducer = (state = false, action) => {
    return action.type === ACTION_TOGGLE_LEFT_ACTIVE ? !state : state
}

const overlayVisibilityReducer = (state = false, action) => {
    if (action.type === ACTION_TOGGLE_OVERLAY_VISIBILITY) {
        return !state
    }
    return state;
}

const rightActiveReducer = (state = false, action) => {
    return action.type === ACTION_TOGGLE_RIGHT_ACTIVE ? !state : state
}

const searchSuggestionsReducer = (state = {
    add: {},
    search: []
}, action) => {
    if (action.type === ACTION_UPDATE_SEARCH_SUGGESTIONS_ADD) {
        return { ...state, add: action.payload }
    } else if (action.type === ACTION_UPDATE_SEARCH_SUGGESTIONS) {
        return { ...state, search: action.payload }
    }
    return state
}

const stockDataReducer = (state = [], action) => {
    if (action.type === ACTION_UPDATE_STOCK_DATA) {
        return action.payload
    } else if (action.type === ACTION_ADD_STOCK_DATA) {
        return [...state, action.payload]
    }
    return state;
}

const stockLoadingReducer = (state = false, action) => {
    if (action.type === ACTION_TOGGLE_DATA_LOADING) {
        return !state
    }
    return state;
}

const userStocksReducer = (state = [], action) => {
    if (action.type === ACTION_ADD_STOCK) {
        return [...state, action.payload]
    }
    return state
}

/* Combine all above reducers, shape of store: 
    {
        overlayVisibility : Boolean,
        searchSuggestions : {
            add: Object,
            search: Array
        }
        userStocks : Array => each element containing a name 
            and a symbol
        confirmation: Boolean
        stocksLoading: Boolean
        stockData: Array of Arrays, each subarray, contains data
        for one stock
        leftActive: Boolean
        rightActive: Boolean
        index: Number      
    }
*/

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
    detail: detailReducer
});