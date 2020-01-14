import React from 'react';
import Arrow from '../Arrow';
import StockContainer from './StockContainer';
import { connect } from 'react-redux';
import { toggleRightActive, toggleLeftActive, updateIndex, updateDetailActive, fetchStockDetails, setDataInterval } from '../../redux/actions';

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
            />
        </div>)
    }

    componentDidMount() {
        if (this.props.userStocks.length > this.props.index) {
            this.props.toggleRightArrow()
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);