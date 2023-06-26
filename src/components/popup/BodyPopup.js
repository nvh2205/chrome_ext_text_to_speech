import React, { useState, useEffect } from 'react';
import './bodyPopup.css'

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
import AudioPlayer from "react-h5-audio-player";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonInfo from './PersonInfo';
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { setLoadingGlobal, setCharPerMonth, setCharPerReq } from '../../redux/popupSlice'
import CounterPanel from './CounterPanel';
import FormPopup from './FormPopup';
import Audio from './Audio'
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
const BodyPopup = () => {
    const dispatch = useDispatch();
    const popupState = useSelector((state) => state.popupReducer)
    const { isLoadingGlobal, isLoadingAudio } = popupState;

    const [userName, setUserName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    //Get info
    useEffect(() => {
        const getInfoUser = async () => {
            dispatch(setLoadingGlobal(true));
            await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({
                    event: "info"
                }, function (response) {
                    setUserName(response.fullName || null);
                    setAvatarUrl(response.avatarUrl || null);

                    dispatch(setCharPerMonth(response.setCharPerMonth || null));
                    dispatch(setCharPerReq(response.setCharPerReq || 150));
                    resolve();
                });
            })
            dispatch(setLoadingGlobal(false));
        }
        getInfoUser()
    }, [])

    return (
        <div className='body-popup'>
            {/* Loading g */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoadingGlobal}
            >
                <CircularProgress color="secondary" />
            </Backdrop>


            <PersonInfo userName={userName} avatarUrl={avatarUrl} />

            <CounterPanel />

            <FormPopup />

            <Audio />

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