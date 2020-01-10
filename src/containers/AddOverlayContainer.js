import { connect } from 'react-redux';
import {
    toggleOverlayVisibility,
    fetchSuggestionsAdd,
    addStock,
    toggleConfirmation,
    fetchSingleStock
} from "../../redux/actions"
import AddOverlay from "../AddOverlay";

const mapStateToProps = state => {
    return {
        visibilityClass: state.overlayVisibility ? "overlay-visible" : "overlay-hidden",
        searchSuggestions: state.searchSuggestions.add.bestMatches,
        index: state.index,
        length: state.userStocks.length
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        toggleVisibility: () => {
            dispatch(toggleOverlayVisibility())
        },
        fetchSuggestions: (keyword) => {
            dispatch(fetchSuggestionsAdd(keyword))
        },
        addStock: (symbol, name) => {
            dispatch(addStock(symbol, name))
        },
        showConfirmation: () => {
            dispatch(toggleConfirmation())
        },
        startStockLoading: (symbol, showLoading) => {
            dispatch(fetchSingleStock(symbol, showLoading))
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(AddOverlay);