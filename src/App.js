import { hot } from "react-hot-loader/root"
import React from "react"
import '../public/css/main.css'
import AddButton from "./AddButton"
import AddOverlayContainer from './containers/AddOverlayContainer'
import Logo from "./Logo"
import Confirmation from "./Confirmation"
import MainContainer from "./containers/MainContainer"
import SearchBarContainer from "./containers/SearchBarContainer"
import StockDetailContainer from "./containers/StockDetailContainer"
import config from "../redux/config";
import { fetchStockData } from "../redux/actions"

const { store } = config
/* Root Component */
class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <AddOverlayContainer />
                <div className="row p-3">
                    <div className="container">
                        <div className="row">
                            <Logo />
                            <SearchBarContainer />
                        </div>
                    </div>
                </div>
                <AddButton />
                <MainContainer />
                <Confirmation />
                <StockDetailContainer />
            </div>
        )
    }

    componentDidMount() {
        const { userStocks } = store.getState();
        let stockCodes = [];
        for (let i = 0; i < Math.min(userStocks.length, 3); i++) {
            stockCodes.push(userStocks[i]["1. symbol"]);
        }
        store.dispatch(fetchStockData(stockCodes))
    }
}

// TODO: remove the hot, and export only App before production build
export default hot(App)