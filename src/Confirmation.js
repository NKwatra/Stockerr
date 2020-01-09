import React from 'react';
import { connect } from 'react-redux';

const mapStatetoProps = state => {
    return {
        visibility: state.confirmation ? "confirmation-visible" :
            "confirmation-hidden"
    }
}

export default connect(mapStatetoProps)((props) => {
    return (
        <div className={`confirmation ${props.visibility}`}>
            <span>Stock Added</span>
            <span className="icon-checkmark" />
        </div>
    )
})