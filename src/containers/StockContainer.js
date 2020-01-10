import React from 'react';
import Loading from '../Loading'

export default class StockContainer extends React.Component {
    state = {
        loading: true,
        userStocks: [],
        startIndex: 0,
        endIndex: 2
    }

    render() {
        return (
            <div className="row">
                {this.state.userStocks.length > 0 ? this.state.loading ? <Loading /> : null
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