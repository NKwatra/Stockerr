import { hot } from "react-hot-loader/root"
import React from "react"
import '../public/css/main.css'
import SearchBar from "./SearchBar"

const App = () => {
    return (
        <div className="container-fluid">
            <div className="row p-3">
                <div className="col-6"></div>
                <SearchBar />
            </div>
        </div>
    );
}

export default hot(App)