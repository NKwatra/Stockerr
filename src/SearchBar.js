import React from 'react'

// limitation : Repeated quick search might lead to not showing of 
// suggestions, this is because of the fact that alpha vantage only 
// allows upto 5 calls per minute. 

export default class SearchBar extends React.Component {

    constructor() {
        super()
        this.state = {
            text: "",
            focussed: false,
            suggestionLength: 7,
        }
        this.searchRef = React.createRef();
        this.clearRef = React.createRef();
        this.handleStockClick = this.handleStockClick.bind(this)
    }

    handleStockClick(event) {
        console.log(this);
        let element = event.target;
        let symbol = element.getAttribute("data-stock-symbol");
        while (!symbol) {
            element = element.parentNode;
            symbol = element.getAttribute("data-stock-symbol")
        }
        const name = element.getAttribute("data-stock-name")
        this.props.stockClick(symbol, name);
        this.clearRef.current.click();
        if (this.props.handleConfirmation) {
            this.props.handleConfirmation();
            setTimeout(this.props.handleConfirmation, 1500);
        }
        this.props.hideSuggestions();
    }

    changeFocus(newFocus) {
        this.setState({
            focussed: newFocus,
            suggestionLength: 7
        })
    }

    handleSearchChange(newValue) {
        this.setState({
            text: newValue
        })
        this.props.suggestions(newValue)
    }

    handleSearchButton() {
        const currentFocus = this.state.focussed;
        this.setState({
            focussed: !currentFocus,
            text: currentFocus ? "" : this.state.text,
            suggestionLength: currentFocus ? 0 : 7
        })
        if (!currentFocus) {
            this.searchRef.current.focus()
        }
    }


    render() {
        return (
            <div className={`col-8 offset-${this.props.offset}`}>
                <div className={`${this.props.position} search-container`}>
                    <input type="text" placeholder="Search Companies..." className="searchbar"
                        value={this.state.text} onChange={(e) => this.handleSearchChange(e.target.value)}
                        onFocus={() => this.changeFocus(true)} ref={this.searchRef} />
                    <span className={this.state.focussed ? "icon-close-solid icons-searchbar" :
                        "icon-search icons-searchbar"} onClick={() => this.handleSearchButton()}
                        ref={this.clearRef} />
                </div>
                {this.props.data ?
                    this.props.data.slice(0, this.state.suggestionLength).map((suggestion, index) => {
                        return (
                            <div className={`search-suggestion ${this.props.position} border-bottom`}
                                key={index} data-stock-symbol={suggestion["1. symbol"]}
                                data-stock-name={suggestion["2. name"]} onClick={this.handleStockClick} >
                                <div className="search-suggestion-symbol">
                                    <span className="font-weight-bold">{suggestion['1. symbol']}</span>
                                </div>
                                <div className="search-suggestion-name">{suggestion['2. name']}</div>
                            </div>
                        )
                    }) : null}
            </div>
        )
    }
}