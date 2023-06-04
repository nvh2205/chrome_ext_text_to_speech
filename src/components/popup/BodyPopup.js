import React from 'react';
import './bodyPopup.css'

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
import AudioPlayer from "react-h5-audio-player";
import Audi from '../content/Audi'
import SettingsIcon from '@mui/icons-material/Settings';
let listAudio = [
    {
        name: "Memories",
        src: "https://pega-audio.mediacdn.vn/./Grad_tts/out/20220801212958.m4a",
    }]
const BodyPopup = () => {
    return (
        <div className='body-popup'>
            <div className='person-info'>
                <div className='avatar-info'>
                    <Avatar sx={{ width: 56, height: 56 }} className='avatar-img'></Avatar>
                </div>
                <div className='group-button'>
                    <Button className='icon-button2' color="secondary" variant="outlined" ><SettingsIcon /></Button>
                    <Button className='icon-button' color="secondary" variant="outlined" ><LogoutIcon /></Button>

                </div>
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
                <img className='img-loading' src={"./icons8-refresh.gif"} />
                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                    <path d="M 20 4 C 14.507813 4 10 8.507813 10 14 L 10 31.75 L 7.125 28.875 L 4.3125 31.71875 L 12 39.40625 L 19.6875 31.71875 L 16.875 28.90625 L 14 31.75 L 14 14 C 14 10.691406 16.691406 8 20 8 L 31 8 L 31 4 Z M 38 10.59375 L 30.28125 18.3125 L 33.125 21.125 L 36 18.25 L 36 36 C 36 39.308594 33.308594 42 30 42 L 19 42 L 19 46 L 30 46 C 35.492188 46 40 41.492188 40 36 L 40 18.25 L 42.875 21.125 L 45.6875 18.28125 Z"></path>
                </svg> */}
            </div>

            {/* <Audi
                listAudio={[
                    {
                        name: "Memories",
                        src: "https://pega-audio.mediacdn.vn/./Grad_tts/out/20220801212958.m4a",
                    }]}

            /> */}
        </div>
    );
};

export default BodyPopup;