import React from 'react';

/*
    This function handles the clicks on left and right arrows
*/
const handleClick = (event, props) => {
    // get a list of all classes of the arrow
    const classes = event.target.className.split(' ');
    // if the arrow is not active, simple return and don't do anything
    if (classes.indexOf("active") === -1) {
        return;
    }
    // get a refrence to container of stocks
    const element = $(".stocks-scroller");
    // get refrence to first child to access it's width
    const child = element.children().eq(0);
    // check if this is the right arrow
    if (classes.indexOf("right-arrow") != -1) {
        // active left arrow if not
        if (!props.leftActive) {
            props.toggleLeft();
        }
        // scroll right by one stock
        const pos = element.scrollLeft() + child.width();
        element.animate({ scrollLeft: pos }, 1000);

        // deactivate right if required
        if (element.width() + element.scrollLeft() + child.width() >= element[0].scrollWidth) {
            props.toggleRight();
        }
        // update the index, since we moved one stock right
        props.updateIndex(props.index + 1)

        // fetch data for next stock if extra stock is present
        if (props.userStocks.length > props.dataLength) {
            props.loadNextStock(props.userStocks[props.index]["1. symbol"])
        }
    } 
    // this is the left arrow
    else 
    {
        // activate right arrow
        if (!props.rightActive) {
            props.toggleRight();
        }

        // scroll one stock left
        const pos = element.scrollLeft() - child.width();
        element.animate({ scrollLeft: pos }, 1000);

        // deactivate left arrow if required
        if (element.scrollLeft() < element.width()) {
            props.toggleLeft();
        }
        // decrease index by one, since we moved one stock left
        props.updateIndex(props.index - 1)
    }
}

export default (props) => {

    return (
        <div className="col-2 text-center mt-5 pt-5">
            <span className={`${props.arrowClasses} pointer`} onClick={(e) => handleClick(e, props)} />
        </div >
    )
}