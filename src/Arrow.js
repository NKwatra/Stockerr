import React from 'react';


const handleClick = (event, props) => {
    const classes = event.target.className.split(' ')
    if (classes.indexOf("active") === -1) {
        return;
    }
    if (classes.indexOf("right-arrow") != -1) {
        // active left arrow if not
        if (!props.leftActive) {
            props.activateLeft();
        }
        // scroll right
        const element = $(".stocks-scroller");
        const child = element.children().eq(0);
        const pos = element.scrollLeft() + child.width();
        element.animate({ scrollLeft: pos }, 1000);
        // deactivate right if required
        if (element.width() + element.scrollLeft() + child.width() >= element[0].scrollWidth) {
            props.deactivateRight();
        }
        props.updateIndex(props.index + 1)
    }
}

export default (props) => {

    return (
        <div className="col-2 text-center mt-5 pt-5">
            <span className={`${props.arrowClasses} pointer`} onClick={(e) => handleClick(e, props)} />
        </div >
    )
}