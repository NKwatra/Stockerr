import React from 'react';

export default (props) => {
    return (
        <div className="col-2 text-center mt-5 pt-5">
            <span className={`${props.arrowClasses}`} />
        </div>
    )
}