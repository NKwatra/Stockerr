import React from 'react';
import * as d3 from 'd3';

const margin = { top: 30, right: 30, bottom: 40, left: 40 }
const width = 800, height = 600;

/*
     This component is used to show stocks on home page.
     This used d3 to draw the stock price graph
*/
export default class Stock extends React.Component {

    // create state for drawing graph and storing stock name and symbol
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

    // create d3 components for axis
    xAxis = d3.axisBottom();
    // add tick format to show only 2 decimal places
    yAxis = d3.axisLeft().tickFormat(d3.format(".2f"));

    // this function draws the axis on the screen
    addAxis = () => {
        // set the scales for axis
        this.xAxis.scale(this.state.xScale);
        this.yAxis.scale(this.state.yScale);

        // draw the axis on the graph
        d3.select(this.refs.xAxis).call(this.xAxis);
        d3.select(this.refs.yAxis).call(this.yAxis);
    }

    // this function is used to show details page for stock clicked
    handleClick() {
        // start loading detailed stocked data for current stock
        this.props.loadStockData(this.state.symbol);
        // create an interval to fetch stock data every minute
        const interval = setInterval(() => {
            this.props.loadStockData(this.state.symbol)
        }, 60000);
        // pass on the interval to store
        this.props.setStockInterval(interval);
        // open the details container
        this.props.openDetails(true, this.state.symbol, this.state.name);
    }

    static getDerivedStateFromProps(props, state) {

        // extract data for currect stock and list of stocks from user
        const { data, stocks } = props;

        // get the symbol of current stock
        const symbol = data[100];
        // get the name of current stock
        const filtered = stocks.filter(stock => stock["1. symbol"] === symbol)
        const name = filtered[0]["2. name"];

        // extract the stock data
        const Data = data.slice(0, 100);


        // create xExtent and yExtent for scales along the axes.
        const xExtent = d3.extent(Data, (d) => new Date(d.date))
        const yExtent = d3.extent(Data, (d) => d.price)

        // create time scale for x axis
        const xScale = d3.scaleTime().domain(xExtent)
            .range([margin.left, width - margin.right]);

        // define scale for y axis    
        const yScale = d3.scaleLinear().domain(yExtent)
            .range([height - margin.bottom, margin.top])

        // create line object and tell it how to extract 
        // x and y co-ordinates of points    
        const line = d3.line()
            .x(d => xScale(new Date(d.date)))
            .y(d => yScale(d.price))
    

        // create an encoding for path    
        const path = line(Data);


        // return the newly created state
        return { path, xScale, yScale, name, symbol }

    }

    // redraw the axis when stock data is updated
    componentDidUpdate() {
        this.addAxis()
    }

    // draw axis when component mounts
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
