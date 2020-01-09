import { hot } from "react-hot-loader/root"
import React from "react"
import '../public/css/main.css'
import logo from "../public/logo.png"
import SearchBar from "./SearchBar"
import AddButton from "./AddButton"
import AddOverlayContainer from './containers/AddOverlayContainer'

const App = () => {
    console.log(process.env.REACT_APP_ALPHA_VANTAGE);
    return (
        <div className="container-fluid">
            <AddOverlayContainer />
            <div className="row p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-center">
                            <img className="logo" src={logo} />
                        </div>
                        <SearchBar position="float-right" offset="0" />
                    </div>
                </div>
            </div>

            <AddButton />
        </div>
    );
}

export default hot(App)