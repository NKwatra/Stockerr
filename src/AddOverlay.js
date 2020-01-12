import React from 'react';
import SearchBar from './SearchBar';

const handleStockClick = (props, symbol, name) => {
    const length = props.length || 0;
    const loading = length - props.index < 2;
    if (length > props.index && !props.rightActive) {
        props.toggleRightArrow();
    }
    props.addStock(symbol, name);
    props.startStockLoading(symbol, loading);
    props.showConfirmation();
    setTimeout(props.showConfirmation, 1500);
    props.toggleVisibility();
}

export default (props) => {
    return (
        <div className={`${props.visibilityClass} overlay row`}>
            <SearchBar position="mx-auto mt-5" offset="2" suggestions={props.fetchSuggestions}
                data={props.searchSuggestions} stockClick={(symbol, name) => handleStockClick(props, symbol, name)} />
            <span className="icon-cross cross-button" onClick={() => {
                props.toggleVisibility()
            }} />
        </div>
    )
}