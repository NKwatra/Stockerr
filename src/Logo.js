import React from 'react';
import logo from "../public/logo.png"

// basic component used for company logo
export default () => {
    return (
        <div className="col-4 text-center">
            <img className="logo" src={logo} />
        </div>
    )
}