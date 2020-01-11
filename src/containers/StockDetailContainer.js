import { connect } from 'react-redux';
import StockDetail from '../StockDetail';

const mapStateToProps = state => {
    return {
        visibility: state.detail.active ? "visible" : "hidden"
    }
}

export default connect(mapStateToProps)(StockDetail)