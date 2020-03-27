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
            suggestionLength: 0,
        }
        // Create references to input and search icon to be used later
        this.searchRef = React.createRef();
        this.clearRef = React.createRef();
        this.handleStockClick = this.handleStockClick.bind(this)
    }

    // this is used to hide suggestions and open detailed stock info when user clicks
    // a particular stock
    handleStockClick(event) {
        let element = event.target;
        let symbol = element.getAttribute("data-stock-symbol");
        while (!symbol) {
            // depending upon where user clicks in suggestion, we might 
            // have to go up the parent node.
            element = element.parentNode;
            symbol = element.getAttribute("data-stock-symbol")
        }
        const name = element.getAttribute("data-stock-name")
        // unfocus the input
        this.clearRef.current.click();
        // start loading detailed data for stock
        this.props.stockClick(symbol, name);
    }

    // used to handle focus change of input
    changeFocus(newFocus) {
        this.setState({
            focussed: newFocus,
            suggestionLength: newFocus ? 7 : 0
        })
    }

    // update search input text and fetch new suggestions
    // on text change in search bar
    handleSearchChange(newValue) {
        this.setState({
            text: newValue
        })
        this.props.suggestions(newValue)
    }

    // used to focus or unfocus input and change symbol from
    // cross to searchbar and back depending upon state
    handleSearchButton() {
        const currentFocus = this.state.focussed;
        this.setState({
            focussed: !currentFocus,
            text: "",
            suggestionLength: currentFocus ? 0 : 7
        })
        if (!currentFocus) {
            this.searchRef.current.focus();
        }
    }


    render() {
        const flatBottomClass = this.state.suggestionLength > 0 ? "flat-bottom" : ""
        return (
            <div className={`col-8 offset-${this.props.offset}`}>
                <div className={`${this.props.position} search-container ${flatBottomClass}`}>
                    <input type="text" placeholder="Search Companies..." className="searchbar"
                        value={this.state.text} onChange={(e) => this.handleSearchChange(e.target.value)}
                        onFocus={() => this.changeFocus(true)} ref={this.searchRef} />
                    <span className={this.state.focussed ? "icon-close-solid icons-searchbar" :
                        "icon-search icons-searchbar"} onClick={() => this.handleSearchButton()}
                        ref={this.clearRef} />
                </div>
                <div>
                    {this.state.text != "" && this.props.data?
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
            </div>
        )
    }
}