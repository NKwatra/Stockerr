import {
    apiKey, keywordKey, baseUrl, functionKey, dataKey, symbolKey
    , intervalKey
} from "../constants";
import { REACT_APP_ALPHA_VANTAGE } from "../api"

/* declare required actions  */

// action to add a new stock to user's collection
export const ACTION_ADD_STOCK = "add_stock"

// action to add data for a single stock
export const ACTION_ADD_STOCK_DATA = "add_stock_data";

// action to toggle the confirmation message, this message is 
// displayed at bottom of screen when user adds a new stock
export const ACTION_TOGGLE_CONFIRMATION = "toggle_confirmation";

// action to toggle visibility of loading indicator, which is
// visible while stocks are loading
export const ACTION_TOGGLE_DATA_LOADING = "toggle_data_loading";

// action to toggle whther left arrow is active or not
export const ACTION_TOGGLE_LEFT_ACTIVE = "toggle_left_active";

// action to control overlay, which allows addition and
// search of new stocks
export const ACTION_TOGGLE_OVERLAY_VISIBILITY = "toggle_overlay";

// action to toggle whther left arrow is active or not
export const ACTION_TOGGLE_RIGHT_ACTIVE = "toggle_right_active";

// action to update the index, of current stock
// being displayed leftmost on the screen
export const ACTION_UPDATE_INDEX = "update_index";

// action to update the search suggestions, these suggestions for 
// searching a stock already in the user's collection
export const ACTION_UPDATE_SEARCH_SUGGESTIONS = "update_suggestions";

// action to update the search suggestions, these suggestions are for 
// new stock to be added and would be visible in searchbar 
// in the overlay component
export const ACTION_UPDATE_SEARCH_SUGGESTIONS_ADD = "update_suggestions_add";

// action  to update the data of all stocks that are 
// being displayed on screen(in form of graph)
export const ACTION_UPDATE_STOCK_DATA = "update_stock_data";


/* Action creaters */

export const addStock = (symbol, name) => {
    return {
        type: ACTION_ADD_STOCK,
        payload: {
            "1. symbol": symbol,
            "2. name": name
        }
    }
}

export const addStockData = (data) => {
    return {
        type: ACTION_ADD_STOCK_DATA,
        payload: data
    }
}

export const toggleConfirmation = () => {
    return { type: ACTION_TOGGLE_CONFIRMATION }
}

export const toggleDataLoading = () => {
    return {
        type: ACTION_TOGGLE_DATA_LOADING
    }
}

export const toggleLeftActive = () => {
    return {
        type: ACTION_TOGGLE_LEFT_ACTIVE
    }
}

export const toggleOverlayVisibility = () => {
    return {
        type: ACTION_TOGGLE_OVERLAY_VISIBILITY
    }
}

export const toggleRightActive = () => {
    return {
        type: ACTION_TOGGLE_RIGHT_ACTIVE
    }
}

export const updateIndex = (newIndex) => {
    return {
        type: ACTION_UPDATE_INDEX,
        payload: newIndex
    }
}

export const updateSearchSuggestions = data => {
    return {
        type: ACTION_UPDATE_SEARCH_SUGGESTIONS,
        payload: data
    }
}

export const updateSearchSuggestionsAdd = (data) => {
    return {
        type: ACTION_UPDATE_SEARCH_SUGGESTIONS_ADD,
        payload: data
    }
}

export const updateStockData = (data) => {
    return {
        type: ACTION_UPDATE_STOCK_DATA,
        payload: data
    }
}

/* Async action creaters */

/* function to fetch prices for a single stock 
    * stockCode(String): symbol of stock
    * showLoading(Boolean): whether to show loading indicator
    * while data is being fetched
*/

export const fetchSingleStock = (stockCode, showLoading) => {

    // return function to be handles by middleware 
    // dispatch(function) : store.dispatch() function to 
    // dispatch actions(synchronous)
    return dispatch => {
        const url = `${baseUrl}${functionKey}=TIME_SERIES_INTRADAY&${symbolKey}=${stockCode}&${intervalKey}=5min&${dataKey}=json&${apiKey}=${REACT_APP_ALPHA_VANTAGE}`;
        if (showLoading) {
            // show loading indicator
            dispatch(toggleDataLoading())
        }
        // return a Promise
        return fetch(url).then(response => response.json())
            .then(result => {
                // process the result, to create an array
                // of date, price values 
                const data = result['Time Series (5min)'];
                let requiredData = [];
                for (let key of Object.keys(data)) {
                    requiredData.push({
                        date: new Date(key),
                        price: data[key]["4. close"]
                    })
                }
                // push the symbol of stock at the end of data
                requiredData.push(result["Meta Data"]["2. Symbol"])
                // add new data to store
                dispatch(addStockData(requiredData))
                // hide loading indicator, if shown previously
                if (showLoading) {
                    dispatch(toggleDataLoading())
                }
            })
    }
}

/* function to fetch data for multiple stocks, to be used 
    on app start, for fetching data.
    * stockCodes(Array): array of stock symbols
*/
export const fetchStockData = (stockCodes) => {
    // return function to be handles by middleware 
    // dispatch(function) : store.dispatch() function to 
    // dispatch actions(synchronous)
    return dispatch => {
        // show loading indicator
        dispatch(toggleDataLoading())
        // create an array of Promises, for all the 
        // fetch requests i.e. store promises returened
        // by all fetch requests
        let promises = []
        stockCodes.forEach(stockCode => {
            const url = `${baseUrl}${functionKey}=TIME_SERIES_INTRADAY&${symbolKey}=${stockCode}&${intervalKey}=5min&${dataKey}=json&${apiKey}=${REACT_APP_ALPHA_VANTAGE}`;
            promises.push(fetch(url)
                .then(response => response.json()))
        })

        // store the data of all stocks once all promises, resolve
        let stockData = []
        // wait for all promises to resolve and then process
        // results : Array of Objects, each object contains data
        // for one stock
        Promise.all(promises).then(results => {
            results.forEach(result => {
                // process results to create an array of arrays
                // where each arrays represents data of one stock
                const data = result['Time Series (5min)'];
                let requiredData = [];
                for (let key of Object.keys(data)) {
                    requiredData.push({
                        date: new Date(key),
                        price: data[key]["4. close"]
                    })
                }
                // push the symbol for stock as last entry
                //in the respective array
                requiredData.push(result["Meta Data"]["2. Symbol"])
                stockData.push(requiredData);
            })
        }).then(() => {
            // update stocks data and hide loading indicator
            // once the above processing is done.
            dispatch(updateStockData(stockData))
            dispatch(toggleDataLoading())
        })

    }
}

/* function to  search suggestions for new stock 
    keyword(String): keyword, to be searched for
*/
export const fetchSuggestionsAdd = (keyword) => {
    const url = `${baseUrl}${functionKey}=SYMBOL_SEARCH&${keywordKey}=${keyword}&${dataKey}=json&${apiKey}=${REACT_APP_ALPHA_VANTAGE}`;
    // return function to be handles by middleware 
    // dispatch(function) : store.dispatch() function to 
    // dispatch actions(synchronous)
    return function (dispatch) {
        return fetch(url).
            then(response => response.json()
                .then(data => dispatch(updateSearchSuggestionsAdd(data))))
    }
}
