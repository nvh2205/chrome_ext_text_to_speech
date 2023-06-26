import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import './personInfo.css'
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from "react-redux";
import { setLoadingGlobal } from '../../redux/popupSlice'
import Modal from '@mui/material/Modal';
import ModalSetting from './ModalSetting';

const PersonInfo = ({ userName, avatarUrl }) => {
    const dispatch = useDispatch();

    //Get state in redux
    const popupState = useSelector((state) => state.popupReducer)
    const { isLoadingGlobal } = popupState;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='person-info'>
            <div className='avatar-info'>
                <Avatar sx={{ width: 56, height: 56 }} className='avatar-img'></Avatar>
            </div>
            <div className='group-button'>
                <Button onClick={handleOpen} className='icon-button2' color="secondary" variant="outlined" ><SettingsIcon className='setting-icon' /></Button>
                <Button className='icon-button' color="secondary" variant="outlined" ><LogoutIcon /></Button>

            </div>
            <div className='info'>
                <h4>{userName ? userName : 'anonymous'}</h4>
            </div>
            <ModalSetting openModalSetting={open} setOpenModalSetting={setOpen} />
        </div>
    );
};

export default PersonInfo;