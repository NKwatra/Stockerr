import { ACTION_TOGGLE_OVERLAY_VISIBILITY } from './actions'
import { combineReducers } from 'redux';

const overlayVisibilityReducer = (state = false, action) => {
    if (action.type === ACTION_TOGGLE_OVERLAY_VISIBILITY) {
        return !state
    }
    return state;
}

export default combineReducers({
    overlayVisibility: overlayVisibilityReducer
});