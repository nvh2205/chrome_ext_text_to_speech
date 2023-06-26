import React from 'react';
import Header from './popup/Header';
import BodyPopup from './popup/BodyPopup';
import "./popup/popup.css"
import CircularProgress from '@mui/material/CircularProgress';

function Popup() {
    return (
        <div className='popup'>
            <Header />
            <BodyPopup/>
        </div>
    )
}

const styles = {
    main: {
        width: '350px',
        height: '400px'
    }
}

export default Popup;