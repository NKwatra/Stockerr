import React from 'react';
import Loading from '../Loading'
import Stock from '../Stock';

export default class StockContainer extends React.Component {
    render() {
        return (
            <div className="row stocks-scroller">
                {this.props.userStocks.length > 0 ? this.props.loading ? <Loading /> : (
                    this.props.data.map((stock, index) => {
                        return <Stock data={stock} key={index} stocks={this.props.userStocks}
                            openDetails={this.props.openDetails} loadStockData={this.props.loadStockData} />
                    })
                )
                    : (
                        <div className=" col-12 mt-5 pt-md-5 text-center">
                            <span className="prompt">
                                Your seem to have an empty collection,<br /> <br />
                                Press the plus button on top right corner
                                to add a new stock to the collection.
                            </span>
                        </div>
                    )}
            </div>
        )
    }
}