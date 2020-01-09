import { hot } from "react-hot-loader/root"
import React from "react"
import '../public/css/main.css'
import SearchBar from "./SearchBar"
import AddButton from "./AddButton"
import AddOverlay from './AddOverlay'

const App = () => {
    return (
        <div className="container-fluid">
            <AddOverlay visibilityClass="overlay-hidden" />
            <div className="row p-3">
                <div className="col-4"></div>
                <SearchBar position="float-right" offset="0" />
            </div>
            <AddButton />
        </div>
    );
}

export default hot(App)