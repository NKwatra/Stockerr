import { connect } from 'react-redux';
import {
    toggleOverlayVisibility,
    fetchSuggestionsAdd,
    addStock,
    toggleConfirmation,
    fetchSingleStock,
    toggleRightActive
} from "../../redux/actions"
import AddOverlay from "../AddOverlay";

// send props to access the current state of app
const mapStateToProps = state => {
    return {
        visibilityClass: state.overlayVisibility ? "overlay-visible" : "overlay-hidden",
        searchSuggestions: state.searchSuggestions.add.bestMatches,
        index: state.index,
        length: state.userStocks.length,
        rightActive: state.rightActive
    }
}

// send props to add overlay to disptach apt actions on clicking a stock
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
        toggleConfirmation: () => {
            dispatch(toggleConfirmation())
        },
        startStockLoading: (symbol, showLoading) => {
            dispatch(fetchSingleStock(symbol, showLoading))
        },
        toggleRightArrow: () => {
            dispatch(toggleRightActive())
        }
    }
}

// This just act as a contact for the overlay component and supplies the
// required props by mapping them from state of store and dispatch provided
// by the store.
export default connect(mapStateToProps, mapDispatchtoProps)(AddOverlay);