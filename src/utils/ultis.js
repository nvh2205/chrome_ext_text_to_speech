
export const setPopoverCoordinates = (x, y, width, hight, heightSelect) => {
    const coordinates = {
        left: 0,
        top: 0,
        bottom: 0,

        //Percentage of text selected in the center
        arrowPositionSelect: 0
    };

    //horizontal handling
    if (x <= width / 2) {
        coordinates.arrowPositionSelect = x / width * 100;

        //Coordinates of popover on the left
        x = width / 2 + 10;
        coordinates.left = x;

    } else if (x + width / 2 >= window.innerWidth) {
        //Coordinates of popover on the right
        let newX = window.innerWidth - width / 2 - 10;

        let currentArrow = x - newX + width / 2;
        currentArrow = currentArrow / width * 100;

        coordinates.left = newX;
        coordinates.arrowPositionSelect = currentArrow;

    } else {
        coordinates.left = x;
        coordinates.arrowPositionSelect = 50;
    }

    //vertical handling
    if (y + hight + heightSelect >= window.innerHeight) {
        coordinates.bottom = window.innerHeight - y + 15;
        let bot = window.innerHeight - y + 15;
        if (bot + hight >= window.innerHeight) {
            coordinates.bottom = (y + heightSelect-hight/2) / 2;
        }
        //coordinates.top = y-hight;
    } else {
        coordinates.top = y + heightSelect;
    }

    coordinates.arrowPositionSelect = coordinates.arrowPositionSelect.toFixed(2);
    return coordinates;

}