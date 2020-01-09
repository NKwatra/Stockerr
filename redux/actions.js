import { apiKey, keywordKey, baseUrl, functionKey, dataKey } from "../constants";
import { REACT_APP_ALPHA_VANTAGE } from "../api"

export const ACTION_TOGGLE_OVERLAY_VISIBILITY = "toggle_overlay";
export const ACTION_UPDATE_SEARCH_SUGGESTIONS_ADD = "update_suggestions_add";
export const ACTION_ADD_STOCK = 'add_stock'

export const toggleOverlayVisibility = () => {
    return {
        type: ACTION_TOGGLE_OVERLAY_VISIBILITY
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

export const fetchSuggestionsAdd = (keyword) => {
    const url = `${baseUrl}${functionKey}=SYMBOL_SEARCH&${keywordKey}=${keyword}&${dataKey}=json&${apiKey}=${REACT_APP_ALPHA_VANTAGE}`;

    return function (dispatch) {
        return fetch(url).
            then(response => response.json()
                .then(data => dispatch(updateSearchSuggestionsAdd(data))))
    }
}