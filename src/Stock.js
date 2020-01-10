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
            yScale: ''
        }
    }

    xAxis = d3.axisBottom();
    yAxis = d3.axisLeft().tickFormat(d3.format(".2f"));

    addAxis = () => {
        this.xAxis.scale(this.state.xScale);
        this.yAxis.scale(this.state.yScale);
        d3.select(this.refs.xAxis).call(this.xAxis);
        d3.select(this.refs.yAxis).call(this.yAxis);
    }

    static getDerivedStateFromProps(props, state) {

        const { data } = props;
        const xExtent = d3.extent(data, (d) => d.date)
        const yExtent = d3.extent(data, (d) => d.price)


        const xScale = d3.scaleTime().domain(xExtent)
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear().domain(yExtent)
            .range([height - margin.bottom, margin.top])

        const line = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.price))

        const path = line(data);

        return { path, xScale, yScale }

    }

    componentDidUpdate() {
        this.addAxis()
    }

    componentDidMount() {
        this.addAxis()
    }

    render() {
        return (
            <div className="col-10 col-lg-8 pr-2">
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
