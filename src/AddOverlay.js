import React from 'react';
import SearchBar from './SearchBar';

export default (props) => {
    return (
        <div className={`${props.visibilityClass} overlay row`}>
            <SearchBar position="mx-auto mt-5" offset="2" />
            <span className="icon-cross cross-button" />
        </div>
    )
}