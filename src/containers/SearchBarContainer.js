import React from 'react';
import { connect } from 'react-redux';
import SearchBar from "../SearchBar";
import { updateSearchSuggestions, fetchStockDetails, updateDetailActive, setDataInterval } from '../../redux/actions';
import config from "../../redux/config";

const { store } = config;

const loadSuggestions = newValue => {
    if (newValue === '')
        return
    const state = store.getState();
    const userStocks = state.userStocks;
    const regex = new RegExp(`^.*${newValue}.*$`, "i");
    return userStocks.filter(stock => {
        return regex.test(stock["2. name"]);
    })
}


const mapDispatchToProps = dispatch => {
    return {
        suggestions: newValue => {
            dispatch(updateSearchSuggestions(loadSuggestions(newValue)))
        },
        stockClick: (symbol, name) => {
            dispatch(fetchStockDetails(symbol))
            const interval = setInterval(() => dispatch(fetchStockDetails(symbol, name), 60000));
            dispatch(setDataInterval(interval))
            dispatch(updateDetailActive(true, symbol, name))
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