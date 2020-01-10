import React from 'react';
import SearchBar from './SearchBar';

export default (props) => {
    return (
        <div className={`${props.visibilityClass} overlay row`}>
            <SearchBar position="mx-auto mt-5" offset="2" suggestions={props.fetchSuggestions}
                data={props.searchSuggestions} stockClick={props.addStock}
                hideSuggestions={props.toggleVisibility} handleConfirmation={props.showConfirmation}
                loadStock={props.startStockLoading} index={props.index}
                length={props.length || 0} />
            <span className="icon-cross cross-button" onClick={() => {
                props.toggleVisibility()
            }} />
        </div>
    )
}