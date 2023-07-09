import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import "./personInfo.css";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import {
    setLoadingGlobal,
    SetErrMessagesGetInfo,
    setInfoUser,
    setCharPerMonth,
    setCharPerReq,
} from "../../redux/popupSlice";
import Modal from "@mui/material/Modal";
import ModalSetting from "./ModalSetting";
import ModalLogOut from "./ModalLogOut";
import LoginIcon from "@mui/icons-material/Login";
const PersonInfo = () => {
    const dispatch = useDispatch();

    //Get state in redux
    const popupState = useSelector((state) => state.popupReducer);
    const { isLoadingGlobal, username, avatarUrl } = popupState;

    //Modal settings
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleLogin = async () => {
        dispatch(setLoadingGlobal(true));
        try {
            chrome.identity.getAuthToken({ interactive: true }, async (token) => {
                if (chrome.runtime.lastError || !token) {
                    dispatch(SetErrMessagesGetInfo(`Error! Can't login `));
                    dispatch(setLoadingGlobal(false));
                    return;
                }
                await new Promise((resolve, reject) => {
                    chrome.runtime.sendMessage(
                        {
                            event: "login",
                            data: {
                                tokenIdOAuth: token,
                            },
                        },
                        function (response) {
                            if (response && response.errorCode) {
                                dispatch(SetErrMessagesGetInfo(`Error! Can't login`));
                                resolve();
                            }
                            const data = response.data;
                            dispatch(
                                setInfoUser({
                                    username: data.fullName,
                                    avatarUrl: data.avatarUrl,
                                })
                            );
                            dispatch(setCharPerMonth(data.charPerMonth));
                            dispatch(setCharPerReq(data.charPerRequest));
                            resolve();
                        }
                    );
                })
                dispatch(setLoadingGlobal(false));

            });
        } catch (error) {
            dispatch(SetErrMessagesGetInfo(`Error! Can't login`));
            dispatch(setLoadingGlobal(false));
        }

    };

    //Modal logout
    const [openModalLogout, setOpenModalLogout] = useState(false);
    const handleOponModalLogout = () => {
        setOpenModalLogout(true);
    };

    return (
        <div className="person-info">
            <div className="avatar-info">
                <Avatar src={avatarUrl} sx={{ width: 56, height: 56 }} className="avatar-img"></Avatar>
            </div>
            <div className="group-button">
                <Button
                    onClick={handleOpen}
                    className="icon-button2"
                    color="secondary"
                    variant="outlined"
                >
                    <SettingsIcon className="setting-icon" />
                </Button>
                {username ? (
                    <Button
                        onClick={handleOponModalLogout}
                        className="icon-button"
                        color="secondary"
                        variant="outlined"
                    >
                        <LogoutIcon />
                    </Button>
                ) : (
                    <Button
                        onClick={handleLogin}
                        className="icon-button"
                        color="secondary"
                        variant="outlined"
                    >
                        <LoginIcon />
                    </Button>
                )}
            </div>
            <div className="info">
                <h4>{username ? username : "anonymous"}</h4>
            </div>
            <ModalSetting openModalSetting={open} setOpenModalSetting={setOpen} />
            <ModalLogOut
                openModalLogout={openModalLogout}
                setOpenModalLogout={setOpenModalLogout}
            />
        </div>
    );
};

export default PersonInfo;
