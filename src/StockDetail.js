import React from 'react';
import Loading from './Loading'
import * as d3 from "d3";

const height = 600, width = 800,
    margin = { top: 20, right: 20, left: 40, bottom: 40 }

// TODO: check for double api calls and no updates of state

export default class StockDetail extends React.Component {

    state = {
        path: '',
        yScale: '',
        xScale: '',
        changeClass: "same",
        values: []
    }

    xAxis = d3.axisBottom();
    yAxis = d3.axisLeft().tickFormat(d3.format(".2f"));

    static getDerivedStateFromProps(props, state) {
        console.log("derived called");
        const { data } = props;
        if (!data || data.length === 0)
            return state;
        console.log("date type", typeof data[0].date);
        const xExtent = d3.extent(data, (d) => new Date(d.date));
        const yExtent = d3.extent(data, (d) => d.price);

        const xScale = d3.scaleTime()
            .domain(xExtent)
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain(yExtent)
            .range([height - margin.bottom, margin.top]);

        const line = d3.line()
            .x(d => xScale(new Date(d.date)))
            .y(d => yScale(d.price));


        const path = line(data);

        console.log(path);

        const change = state.values.length > 0 ? state.values[state.values.length - 1].price - data[0].price : 0;
        const changeClass = change > 0 ? "text-success" : change == 0 ? "text-warning" : "text-danger"

        return { path, xScale, yScale, changeClass, values: [data[0], ...(state.values)] }
    }


    componentDidUpdate() {
        console.log(this.state)
        if (this.state.xScale !== '') {
            this.xAxis.scale(this.state.xScale);
            this.yAxis.scale(this.state.yScale);
            d3.select(this.refs.xAxis).call(this.xAxis);
            d3.select(this.refs.yAxis).call(this.yAxis);
            if (this.props.visibility === 'visible') {
                console.log("update: 53", Date.now());
                this.timeout = setTimeout(() => {
                    console.log("time of run", Date.now())
                    this.props.rePoll(this.props.symbol)
                }, 60000);
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        const arrow = this.state.changeClass === "text-success" ? "icon-arrow-up2" :
            this.state.changeClass === "text-danger" ? "icon-arrow-down2" : "icon-arrow-left2"
        return (
            <div className={`stock-detail-container stock-detail-${this.props.visibility}`}>
                <span className="cross-button icon-cross" onClick={() => {
                    this.props.close();
                    this.setState({
                        path: '',
                        xScale: '',
                        yScale: '',
                        changeClass: "same",
                        values: []
                    })
                    clearTimeout(this.timeout);
                }}></span>
                {this.props.visibility === "visible" ? this.props.data.length > 0 ? (<div className="row mt-lg-5 mt-3">
                    <div className="col-8">
                        <svg width={800} height={600} viewBox="0 0 800 600"
                            preserveAspectRatio="xMidYMid meet" id="detail-svg">
                            <path stroke={'rgb(243, 136, 81)'}
                                strokeWidth={2} fill="none" d={this.state.path} />
                            <g transform={`translate(0, ${height - margin.bottom})`} ref="xAxis" className="axis" />
                            <g transform={`translate(${margin.left}, 0)`} ref="yAxis" className="axis" />
                        </svg>
                    </div>
                    <div className="col-4">
                        <span className="text-light h4">{this.props.name}</span><br />
                        <span className="text-light h4">({this.props.symbol})</span><br />
                        <div className={`${this.state.changeClass} mt-4`}>
                            <span className="h1 font-weight-light">$ {(+(this.state.values[this.state.values.length - 1].price)).toFixed(2)}</span>
                            <span className={`${arrow} ml-3 h2`} ></span>
                        </div>
                        <div className="values-container">
                            <div className="text-warning">STOCK VALUES</div>
                            {this.state.values.map((value, index) => {
                                return <div key={index}>$ {(+(value.price)).toFixed(3)}</div>
                            })}
                        </div>
                    </div>
                </div>) : (<div className="mt-md-5 mt-4 pt-4 pt-md-5"><Loading /></div>) : null}
            </div>
        )
    }

}