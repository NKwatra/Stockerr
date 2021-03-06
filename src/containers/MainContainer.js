import React from 'react';
import Arrow from '../Arrow';
import StockContainer from './StockContainer';
import { connect } from 'react-redux';
import { toggleRightActive, toggleLeftActive, updateIndex, updateDetailActive, fetchStockDetails, setDataInterval, fetchSingleStock } from '../../redux/actions';

// get props from the redux store state
const mapStateToProps = state => {
    return {
        leftActive: state.leftActive,
        rightActive: state.rightActive,
        loading: state.stocksLoading,
        userStocks: state.userStocks,
        data: state.stockData,
        index: state.index
    }
}

// define props corresponding to dispatching of actions in redux
const mapDispatchToProps = dispatch => {
    return {
        toggleRightArrow: () => {
            dispatch(toggleRightActive())
        },
        toggleLeftArrow: () => {
            dispatch(toggleLeftActive())
        },
        updateIndex: (newIndex) => {
            dispatch(updateIndex(newIndex))
        },
        openDetails: (active, symbol, name) => {
            dispatch(updateDetailActive(active, symbol, name))
        },
        loadStockData: (symbol) => {
            dispatch(fetchStockDetails(symbol))
        },
        setStockInterval: (interval) => {
            dispatch(setDataInterval(interval))
        },
        loadNextStock: symbol => {
            dispatch(fetchSingleStock(symbol, false))
        }
    }
}

class MainContainer extends React.Component {


    render() {
        const leftArrow = this.props.leftActive ? "active arrow left-arrow icon-point-left" : "inactive arrow left-arrow icon-point-left";
        const rightArrow = this.props.rightActive ? "active arrow right-arrow icon-point-right" : "inactive arrow right-arrow icon-point-right";
        return (<div className="row mt-5 pt-5">
            <Arrow arrowClasses={`${leftArrow}`} leftActive={this.props.leftActive} toggleLeft={this.props.toggleLeftArrow}
                toggleRight={this.props.toggleRightArrow} index={this.props.index}
                updateIndex={this.props.updateIndex} rightActive={this.props.rightActive} />
            <div className="col-8 stocks-container">
                <StockContainer loading={this.props.loading} userStocks={this.props.userStocks}
                    data={this.props.data} openDetails={this.props.openDetails}
                    loadStockData={this.props.loadStockData} setStockInterval={this.props.setStockInterval} />
            </div>
            <Arrow arrowClasses={`${rightArrow}`} leftActive={this.props.leftActive} toggleLeft={this.props.toggleLeftArrow}
                toggleRight={this.props.toggleRightArrow} index={this.props.index}
                updateIndex={this.props.updateIndex} rightActive={this.props.rightActive}
                loadNextStock={this.props.loadNextStock} userStocks={this.props.userStocks}
                dataLength={this.props.data.length} />
        </div>)
    }

    componentDidMount() {
        // check if there are more stock in collection than visible on screen
        if (this.props.userStocks.length > this.props.index) {
            // make right arrow active in case of more stocks
            this.props.toggleRightArrow()
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);