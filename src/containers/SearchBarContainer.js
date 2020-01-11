import React from 'react';
import { connect } from 'react-redux';
import SearchBar from "../SearchBar";
import { updateSearchSuggestions } from '../../redux/actions';
import { store } from "../index";


const loadSuggestions = newValue => {
    if (newValue === '')
        return
    const state = store.getState();
    const userStocks = state.userStocks;
    const regex = new RegExp(`^.*${newValue}.*$`, "i");
    console.log(regex.toString())
    return userStocks.filter(stock => {
        return regex.test(stock["2. name"]);
    })
}


const mapDispatchToProps = dispatch => {
    return {
        suggestions: newValue => {
            dispatch(updateSearchSuggestions(loadSuggestions(newValue)))
        }
    }
}

const mapStateToProps = state => {
    return {
        position: "ml-auto mt-4",
        offset: "0",
        data: state.searchSuggestions.search
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);