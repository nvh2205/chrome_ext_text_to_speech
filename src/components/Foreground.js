import React, { useContext, useEffect, useState } from 'react';
import ForegroundA from './content/ForegroundA'
import ShowIcon from './content/ShowIcon'
import { useSelector, useDispatch } from 'react-redux'
import { setText, setShowIcon, setShowPopover, setXY } from '../redux/textSlice'
import PopoverShow from './content/PopoverShow'
import { setPopoverCoordinates } from '../utils/ultis';
import Test from './content/Test'

function Foreground() {

    const dispatch = useDispatch()

    const text_ = useSelector(state => state.text);
    const { selectText, x_, y_, showIcon, showPopover } = text_;

    //Width and height of popover to set coordinates for reasonable
    const [widthPop, setWidthPop] = useState(450);
    const [heightPop, setHeightPop] = useState(370);

    //Check popover position (bottom or top)
    const [checkTop, setCheckTop] = useState(false);



    const onMouseUp = () => {


        const selection = window.getSelection();
        const text = selection.toString().trim();


        const selectionRange = selection.getRangeAt(0);

        const { x, y, width, height } = selectionRange.getBoundingClientRect();
        // const startNode = selectionRange.startContainer.parentNode;
        // const endNode = selectionRange.endContainer.parentNode;

        // if (!startNode.isSameNode(endNode)) {
        //     const action = setShowIcon(false);
        //     dispatch(action);
        //     return;
        // }


        if (width.toFixed(1) == 0) {
            const action = setShowIcon(false);
            dispatch(action);
            return;
        }


        if (text) {
            const actionText = setText(text);
            dispatch(actionText);

            const actionShowIcon = setShowIcon(true);
            dispatch(actionShowIcon);


            const xNew = x + width / 2;
            const heightSelect=height;
            const yNew = y;
            //const yNew = y;

            const coordinates = setPopoverCoordinates(xNew, yNew, widthPop, heightPop,heightSelect);

            const actionXY = setXY({x:xNew,y:yNew+window.scrollY+10+height,...coordinates});
            dispatch(actionXY);

        }
        else {
            const actionText = setText('');
            dispatch(actionText);

            const actionShowIcon = setShowIcon(false);
            dispatch(actionShowIcon);

        }

    }

    useEffect(() => {

        showPopover == false && window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mouseup', onMouseUp);
        }

    });

    const aavv = () => {
        const result = [];
        for (let i = 0; i < 100; i++) {
            result.push(<p key={i}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>)
        }
        return result;
    }



    return (
        <div>
            {/* <h1 style={{ display: 'flex', flexDirection: 'row-reverse' }}>Chrome Ext - Foreground</h1>
            <h1>asdfasdfasfsdaf</h1>
            <p>lorem ipsum d</p>
            {aavv()} */}
            <Test/>
            {aavv()}
            {showIcon && <ShowIcon />}
            <PopoverShow widthPop={widthPop} heightPop={heightPop}/>

        </div>
    )
}

export default Foreground;