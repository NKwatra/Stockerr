import { connect } from 'react-redux';
import { toggleOverlayVisibility, fetchSuggestionsAdd, addStock } from "../../redux/actions"
import AddOverlay from "../AddOverlay";

const mapStateToProps = state => {
    return {
        visibilityClass: state.overlayVisibility ? "overlay-visible" : "overlay-hidden",
        searchSuggestions: state.searchSuggestions.add.bestMatches
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(AddOverlay);