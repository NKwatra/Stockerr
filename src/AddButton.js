import React from 'react';
import { store } from './index'
import { toggleOverlayVisibility } from "../redux/actions"

export default () => {
    return (
        <div className="row">
            <div className="col-md-2 col-4 offset-md-10 offset-8">
                <div className="bg-light-gray ml-auto text-center plus-container"
                    onClick={() => store.dispatch(toggleOverlayVisibility())}>
                    <span className="icon-plus" />
                </div>
            </div>
        </div>
    )
}