import React from 'react'

export default class SearchBar extends React.Component {

    constructor() {
        super()
        this.state = {
            text: "",
            focussed: false,
        }
        this.searchRef = React.createRef()
    }

    handleSearchChange(newValue) {
        this.setState({
            text: newValue
        })
    }

    handleSearchButton() {
        const currentFocus = this.state.focussed;
        this.setState({
            focussed: !currentFocus,
            text: currentFocus ? "" : this.state.text
        })
        if (!currentFocus) {
            this.searchRef.current.focus()
        }
    }

    changeFocus(newFocus) {
        this.setState({
            focussed: newFocus
        })
    }

    render() {
        return (
            <div className="col-6">
                <div className="float-right search-container">
                    <input type="text" placeholder="Search Companies..." className="searchbar"
                        value={this.state.text} onChange={(e) => this.handleSearchChange(e.target.value)}
                        onFocus={() => this.changeFocus(true)} ref={this.searchRef} />
                    <span className={this.state.focussed ? "icon-close-solid icons-searchbar" :
                        "icon-search icons-searchbar"} onClick={() => this.handleSearchButton()} />
                </div>
            </div>
        )
    }
}