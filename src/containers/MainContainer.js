import React from 'react';
import Arrow from '../Arrow';
import StockContainer from './StockContainer';
import { connect } from 'react-redux';
import { toggleRightActive, toggleLeftActive } from '../../redux/actions';

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
        }
    }
}

class MainContainer extends React.Component {

    render() {
        const leftArrow = this.props.leftActive ? "active arrow left-arrow icon-point-left" : "inactive arrow left-arrow icon-point-left";
        const rightArrow = this.props.rightActive ? "active arrow right-arrow icon-point-right" : "inactive arrow right arrow icon-point-right";
        return (<div className="row mt-5 pt-5">
            <Arrow arrowClasses={`${leftArrow}`} />
            <div className="col-8 stocks-container">
                <StockContainer loading={this.props.loading} userStocks={this.props.userStocks} data={this.props.data} />
            </div>
            <Arrow arrowClasses={`${rightArrow}`} />
        </div>)
    }

    componentDidMount() {
        if (this.props.userStocks.length > this.props.index) {
            this.props.toggleRightArrow()
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);