import React from 'react';
import Arrow from '../Arrow';
import Loading from '../Loading';
import Stock from '../Stock';
import StockContainer from './StockContainer';

export default class MainContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            leftActive: false,
            rightActive: true,
        }
    }

    render() {
        const leftArrow = this.state.leftActive ? "active arrow left-arrow icon-point-left" : "inactive arrow left-arrow icon-point-left";
        const rightArrow = this.state.rightActive ? "active arrow right-arrow icon-point-right" : "inactive arrow right arrow icon-point-right";
        return (<div className="row mt-5 pt-5">
            <Arrow arrowClasses={`${leftArrow}`} />
            <div className="col-8 stocks-container">
                <StockContainer />
            </div>
            <Arrow arrowClasses={`${rightArrow}`} />
        </div>)
    }
}