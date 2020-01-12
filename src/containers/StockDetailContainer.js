import { connect } from 'react-redux';
import StockDetail from '../StockDetail';
import { updateDetailActive, fetchStockDetails, updateDetailActiveData } from "../../redux/actions";

const mapStateToProps = state => {
    return {
        visibility: state.detail.active ? "visible" : "hidden",
        name: state.detail.name,
        symbol: state.detail.symbol,
        data: state.detail.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        close: () => {
            dispatch(updateDetailActiveData([]))
            dispatch(updateDetailActive(false))
        },
        rePoll: symbol => {
            dispatch(fetchStockDetails(symbol))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockDetail)