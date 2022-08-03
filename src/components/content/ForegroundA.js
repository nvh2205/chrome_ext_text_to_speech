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
        <audio controls name="media" style={{width:"100%"}}>
        <source
          src="https://pega-audio.mediacdn.vn/Grad_tts/out/20220801212958.m4a"
          type="audio/mpeg"
        />
      </audio>
    )
}

export default ForegroundA;