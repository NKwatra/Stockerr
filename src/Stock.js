import React from 'react';
import * as d3 from 'd3';

const margin = { top: 30, right: 30, bottom: 40, left: 40 }
const width = 800, height = 600;

export default class Stock extends React.Component {

    constructor() {
        super()
        this.state = {
            path: '',
            xScale: '',
            yScale: '',
            name: '',
            symbol: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    xAxis = d3.axisBottom();
    yAxis = d3.axisLeft().tickFormat(d3.format(".2f"));

    addAxis = () => {
        this.xAxis.scale(this.state.xScale);
        this.yAxis.scale(this.state.yScale);
        d3.select(this.refs.xAxis).call(this.xAxis);
        d3.select(this.refs.yAxis).call(this.yAxis);
    }

    handleClick() {
        this.props.loadStockData(this.state.symbol);
        this.props.openDetails(true, this.state.symbol, this.state.name);
    }

    static getDerivedStateFromProps(props, state) {

        const { data, stocks } = props;
        const symbol = data[100];
        const filtered = stocks.filter(stock => stock["1. symbol"] === symbol)
        const name = filtered[0]["2. name"];
        const Data = data.slice(0, 100);
        const xExtent = d3.extent(Data, (d) => new Date(d.date))
        const yExtent = d3.extent(Data, (d) => d.price)


        const xScale = d3.scaleTime().domain(xExtent)
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear().domain(yExtent)
            .range([height - margin.bottom, margin.top])

        const line = d3.line()
            .x(d => xScale(new Date(d.date)))
            .y(d => yScale(d.price))

        const path = line(Data);

        return { path, xScale, yScale, name, symbol }

    }

    componentDidUpdate() {
        this.addAxis()
    }

    componentDidMount() {
        this.addAxis()
    }

    render() {
        return (
            <div className="col-10 col-lg-8 mr-4">
                <div className="text-center">
                    <span className="text-danger pointer" onClick={this.handleClick}>{this.state.name}</span>
                </div>
                <svg width={800} height={600} viewBox={"0 0 800 600"}
                    preserveAspectRatio="xMidYMid meet">
                    <path d={this.state.path} stroke={'rgb(243, 136, 81)'}
                        strokeWidth={2} fill="none" />
                    <g ref="xAxis" transform={`translate(0,${height - margin.bottom})`} className="axis" />
                    <g ref="yAxis" transform={`translate(${margin.left}, 0)`} className="axis" />
                </svg>
            </div>
        )
    }


}
