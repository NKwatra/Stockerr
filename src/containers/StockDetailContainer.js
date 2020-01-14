import { connect } from 'react-redux';
import StockDetail from '../StockDetail';
import { updateDetailActive, updateDetailActiveData } from "../../redux/actions";

const mapStateToProps = state => {
    return {
        visibility: state.detail.active ? "visible" : "hidden",
        name: state.detail.name,
        symbol: state.detail.symbol,
        data: state.detail.data,
        interval: state.interval,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        close: () => {
            dispatch(updateDetailActiveData([]))
            dispatch(updateDetailActive(false))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockDetail)