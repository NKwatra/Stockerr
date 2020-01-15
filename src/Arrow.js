import React from 'react';


const handleClick = (event, props) => {
    const classes = event.target.className.split(' ')
    if (classes.indexOf("active") === -1) {
        return;
    }
    const element = $(".stocks-scroller");
    const child = element.children().eq(0);
    if (classes.indexOf("right-arrow") != -1) {
        // active left arrow if not
        if (!props.leftActive) {
            props.toggleLeft();
        }
        // scroll right
        const pos = element.scrollLeft() + child.width();
        element.animate({ scrollLeft: pos }, 1000);

        // deactivate right if required
        if (element.width() + element.scrollLeft() + child.width() >= element[0].scrollWidth) {
            props.toggleRight();
        }
        props.updateIndex(props.index + 1)

        // fetch data for next stock if extra stock is present
        if (props.userStocks.length > props.dataLength) {
            props.loadNextStock(props.userStocks[props.index]["1. symbol"])
        }
    } else {
        if (!props.rightActive) {
            props.toggleRight();
        }

        const pos = element.scrollLeft() - child.width();
        element.animate({ scrollLeft: pos }, 1000);

        if (element.scrollLeft() < element.width()) {
            props.toggleLeft();
        }
        props.updateIndex(props.index - 1)
    }
    console.log(element.scrollLeft())
}

export default (props) => {

    return (
        <div className="col-2 text-center mt-5 pt-5">
            <span className={`${props.arrowClasses} pointer`} onClick={(e) => handleClick(e, props)} />
        </div >
    )
}