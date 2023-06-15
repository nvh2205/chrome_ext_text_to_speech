import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import './personInfo.css'
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from "react-redux";
import { setLoadingGlobal } from '../../redux/popupSlice'
const PersonInfo = () => {
    const dispatch = useDispatch();

    //Get state in redux
    const popupState = useSelector((state) => state.popupReducer)
    const { isLoadingGlobal } = popupState;

    const [userName, setUserName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('') ;

    //Get info
    useEffect(() => {
        const getInfoUser = async () => {
            dispatch(setLoadingGlobal(true));
            await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({
                    event: "info"
                }, function (response) {
                    setUserName(response.fullName);
                    setAvatarUrl(response.avatarUrl);
                    resolve();
                });
            })
            dispatch(setLoadingGlobal(false));
        }
        // getInfoUser()
    },[])


    return (
        <div className='person-info'>
            <div className='avatar-info'>
                <Avatar sx={{ width: 56, height: 56 }} className='avatar-img'></Avatar>
            </div>
            <div className='group-button'>
                <Button className='icon-button2' color="secondary" variant="outlined" ><SettingsIcon /></Button>
                <Button className='icon-button' color="secondary" variant="outlined" ><LogoutIcon /></Button>

            </div>
            <div className='info'>
                <h4>{userName?userName:'anonymous'}</h4>
            </div>
        </div>
    );
};

export default PersonInfo;