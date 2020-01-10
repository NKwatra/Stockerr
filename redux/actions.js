import {
    apiKey, keywordKey, baseUrl, functionKey, dataKey, symbolKey
    , intervalKey
} from "../constants";
import { REACT_APP_ALPHA_VANTAGE } from "../api"

export const ACTION_TOGGLE_OVERLAY_VISIBILITY = "toggle_overlay";
export const ACTION_UPDATE_SEARCH_SUGGESTIONS_ADD = "update_suggestions_add";
export const ACTION_ADD_STOCK = "add_stock"
export const ACTION_TOGGLE_CONFIRMATION = "toggle_confirmation";
export const ACTION_TOGGLE_DATA_LOADING = "toggle_data_loading";
export const ACTION_UPDATE_STOCK_DATA = "update_stock_data";
export const ACTION_TOGGLE_LEFT_ACTIVE = "toggle_left_active";
export const ACTION_TOGGLE_RIGHT_ACTIVE = "toggle_right_active";
export const ACTION_UPDATE_START_INDEX = "update_start_index";
export const ACITON_UPDATE_STOP_INDEX = "update_stop_index";

export const toggleOverlayVisibility = () => {
    return {
        type: ACTION_TOGGLE_OVERLAY_VISIBILITY
    }
}

export const updateStartIndex = (newIndex) => {
    return {
        type: ACTION_UPDATE_START_INDEX,
        payload: newIndex
    }
}

export const updateStopIndex = (newIndex) => {
    return {
        type: ACITON_UPDATE_STOP_INDEX,
        payload: newIndex
    }
}

export const toggleLeftActive = () => {
    return {
        type: ACTION_TOGGLE_LEFT_ACTIVE
    }
}

export const toggleRightActive = () => {
    return {
        type: ACTION_TOGGLE_RIGHT_ACTIVE
    }
}

export const updateSearchSuggestionsAdd = (data) => {
    return {
        type: ACTION_UPDATE_SEARCH_SUGGESTIONS_ADD,
        payload: data
    }
}

export const addStock = (symbol, name) => {
    return {
        type: ACTION_ADD_STOCK,
        payload: {
            symbol,
            name
        }
    }
}

export const toggleConfirmation = () => {
    return { type: ACTION_TOGGLE_CONFIRMATION }
}

export const fetchSuggestionsAdd = (keyword) => {
    const url = `${baseUrl}${functionKey}=SYMBOL_SEARCH&${keywordKey}=${keyword}&${dataKey}=json&${apiKey}=${REACT_APP_ALPHA_VANTAGE}`;

    return function (dispatch) {
        return fetch(url).
            then(response => response.json()
                .then(data => dispatch(updateSearchSuggestionsAdd(data))))
    }
}

export const toggleDataLoading = () => {
    return {
        type: ACTION_TOGGLE_DATA_LOADING
    }
}

export const updateStockData = (data) => {
    return {
        type: ACTION_UPDATE_STOCK_DATA,
        payload: data
    }
}



export const fetchStockData = (stockCodes) => {
    return dispatch => {
        dispatch(toggleDataLoading())
        let promises = []
        stockCodes.forEach(stockCode => {
            const url = `${baseUrl}${functionKey}=TIME_SERIES_INTRADAY&${symbolKey}=${stockCode}&${intervalKey}=15min&${dataKey}=json&${apiKey}=${REACT_APP_ALPHA_VANTAGE}`;
            promises.push(fetch(url)
                .then(response => response.json()))
        })
        let stockData = []
        Promise.all(promises).then(results => {
            results.forEach(result => {
                const data = result['Time Series (15min)'];
                let requiredData = [];
                for (let key of Object.keys(data)) {
                    requiredData.push({
                        date: new Date(key),
                        price: data[key]["4. close"]
                    })
                }
                stockData.push(requiredData);
            })
        }).then(() => dispatch(updateStockData(stockData)))

    }
}