import React from 'react';
import Loading from './Loading'
import * as d3 from "d3";

const height = 600, width = 800,
    margin = { top: 20, right: 20, left: 40, bottom: 40 }


export default class StockDetail extends React.Component {

    // state used for drawing stock graph
    state = {
        path: '',
        yScale: '',
        xScale: '',
        changeClass: "same",
        values: []
    }

    // references for graph axis
    xAxis = d3.axisBottom();
    yAxis = d3.axisLeft().tickFormat(d3.format(".2f"));

    static getDerivedStateFromProps(props, state) {
        const { data } = props;
        // make sure data is loaded
        if (!data || data.length === 0)
            return state;

        // create extents for x and y scale    
        const xExtent = d3.extent(data, (d) => new Date(d.date));
        const yExtent = d3.extent(data, (d) => d.price);

        // create scales for x and y axis
        const xScale = d3.scaleTime()
            .domain(xExtent)
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain(yExtent)
            .range([height - margin.bottom, margin.top]);

        // get reference to line to draw stock curve    
        const line = d3.line()
            .x(d => xScale(new Date(d.date)))
            .y(d => yScale(d.price));

        // get the path in terms of keywords for stock curve
        const path = line(data);

        // determine whether stock value, increased or decreased
        const change = state.values.length > 0 ? state.values[0].price - data[0].price : 0;
        const changeClass = change < 0 ? "text-success" : change == 0 ? "text-warning" : "text-danger"

        // return state
        return { path, xScale, yScale, changeClass, values: [data[0], ...(state.values)] }
    }


    componentDidUpdate() {
        // create axis with each update of data
        if (this.state.xScale !== '') {
            this.xAxis.scale(this.state.xScale);
            this.yAxis.scale(this.state.yScale);
            d3.select(this.refs.xAxis).call(this.xAxis);
            d3.select(this.refs.yAxis).call(this.yAxis);
        }
    }

    componentWillUnmount() {
        // clear interval used for repeated fetching of data
        clearInterval(this.props.interval);
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
                    clearInterval(this.props.interval);
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
                            <span className="h1 font-weight-light">$ {(+(this.state.values[0].price)).toFixed(2)}</span>
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