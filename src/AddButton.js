import React from 'react';
import config from '../redux/config'
import { toggleOverlayVisibility } from "../redux/actions"

const { store } = config;

// component to display add button, which allows user to add new stock to collection
export default () => {
    return (
        <div className="row">
            <div className="col-md-2 col-4 offset-md-10 offset-8">
                <div className="ml-auto text-center plus-container"
                    onClick={() => store.dispatch(toggleOverlayVisibility())}>
                    <span className="icon-plus" />
                </div>
            </div>
        </div>
    )
}