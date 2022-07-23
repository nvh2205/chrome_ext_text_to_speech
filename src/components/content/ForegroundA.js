import React, { useContext, useEffect, useState, useRef } from 'react';
import ShowIcon from './ShowIcon'
import PopoverShow from './PopoverShow'
import Popper from '@mui/material/Popper';
import Draggable from "react-draggable";
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';

function ForegroundA() {


    const [selectedText, setSelectedText] = useState('');

    //Show icon when user bold highlight text
    const [showIcon, setShowIcon] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);


    let [showInfo1, setShowInfo1] = useState(true);


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    //console.log(selectedText);


    const [positions, setPositions] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const nodeRef = useRef(null);

    function handleStop(e, data) {
        console.log('x: ', e.x, 'y: ', e.y);
        let dummyPositions = { ...positions };
        const itemId = e.target.id;
        dummyPositions["x"] = data.x;
        dummyPositions["y"] = data.y;
        setPositions(dummyPositions);
    }

    const onDrag = (e, data) => {
        if (e.x > 200) {
            setHasLoaded(true)

        }
    }
    return (
        <div>
            <button aria-describedby={id} type="button" onClick={handleClick}>
                Toggle Popper
            </button>

            <Draggable
                // defaultPosition={
                //     positions
                //         ? { x: 0, y: 0 }
                //         : { x: positions.x, y: positions.y }
                // }
                key={1}
                nodeRef={nodeRef}
                onStop={handleStop}
                bounds={{ top: -100, left: -100, right: 100, bottom: 100 }}
                //disabled={hasLoaded}
                positions={positions
                    ? { x: 0, y: 0 }
                    : { x: positions.x, y: positions.y }}
                onDrag={onDrag}
            >
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    ref={nodeRef}
                >

                    <div  style={{ backgroundColor: 'lightblue', margin: '20px 25%', textAlign: 'center', fontSize: '40px' }}

                    >
                        Item1
                    </div>


                </Popover>
            </Draggable>

        </div>
    )
}

export default ForegroundA;