import { hot } from "react-hot-loader/root"
import React from "react"
import '../public/css/main.css'
import SearchBar from "./SearchBar"
import AddButton from "./AddButton"
import AddOverlayContainer from './containers/AddOverlayContainer'
import Logo from "./Logo"
import Confirmation from "./Confirmation"
import MainContainer from "./containers/MainContainer"

const App = () => {
    return (
        <div className="container-fluid">
            <AddOverlayContainer />
            <div className="row p-3">
                <div className="container">
                    <div className="row">
                        <Logo />
                        <SearchBar position="float-right mt-4" offset="0" />
                    </div>
                </div>
            </div>
            <AddButton />
            <MainContainer />
            <Confirmation />
        </div>
    );
}

export default hot(App)