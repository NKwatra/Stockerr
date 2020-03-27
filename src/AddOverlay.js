import React from 'react';
import SearchBar from './SearchBar';

// this function is used add a stock to collection
const handleStockClick = (props, symbol, name) => {
    const length = props.length || 0;
    // check if we need to show loading indicator, which is shown when less
    // than 2 stock are currently added to the list.
    const loading = length - props.index < 2;
    // if we need to make the right arrow active, activate it
    if (length > props.index && !props.rightActive) {
        props.toggleRightArrow();
    }
    // add stock to user collection.
    props.addStock(symbol, name);
    // start loading data for currently added stock
    props.startStockLoading(symbol, loading);
    // show confirmation for stock has been added
    props.toggleConfirmation();
    // remove confirmation after 1500 ms
    setTimeout(props.toggleConfirmation, 1500);
    // hide the overlay to bring user back to home page 
    props.toggleVisibility();
}

// this component adds an overlay that allows user to search for new stocks
// that can be added to collection.
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