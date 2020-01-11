import { hot } from "react-hot-loader/root"
import React from "react"
import '../public/css/main.css'
import AddButton from "./AddButton"
import AddOverlayContainer from './containers/AddOverlayContainer'
import Logo from "./Logo"
import Confirmation from "./Confirmation"
import MainContainer from "./containers/MainContainer"
import SearchBarContainer from "./containers/SearchBarContainer"

/* Root Component */
const App = () => {
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
        </div>
    );
}

// TODO: remove the hot, and export only App before production build
export default hot(App)