import { connect } from 'react-redux';
import { toggleOverlayVisibility } from "../../redux/actions"
import AddOverlay from "../AddOverlay";

const mapStateToProps = state => {
    return {
        visibilityClass: state.overlayVisibility ? "overlay-visible" : "overlay-hidden"
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        toggleVisibility: () => {
            dispatch(toggleOverlayVisibility())
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(AddOverlay);