import React from 'react';
import './bodyPopup.css'

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';

const BodyPopup = () => {
    return (
        <div className='body-popup'>
            <div className='person-info'>
                <div className='avatar-info'>
                    <Avatar sx={{ width: 56, height: 56 }} className='avatar-img'></Avatar>
                </div>
                <Button className='icon-button' color="secondary" variant="outlined" ><LogoutIcon /></Button>
                <div className='info'>
                    <h4>Hieu Nguyen</h4>
                </div>
            </div>


            <div id="counter-panel" className="card">
                <div className="stats">
                    <div id="stats-page">
                        <span data-i18n="stats_label_page">on this page</span>
                        <strong className="amount">0</strong>
                    </div>
                    <div id="stats-total">
                        <span data-i18n="stats_label_total">in total</span>
                        <strong className="amount">300,836</strong>
                    </div>
                </div>
                <div className="share">
                    <div className="stack">
                        <Button variant="outlined">Outlined</Button>
                    </div>
                </div>
            </div>

            <div className="form">
                <TextField
                  id="filled-multiline-static"
                  label="Multiline"
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                  variant="filled"
                  className='text-field'
                  color="secondary"
                />
            </div>
        </div>
    );
};

export default BodyPopup;