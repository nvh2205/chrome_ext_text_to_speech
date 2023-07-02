import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import Fade from "@mui/material/Fade";
import "./modalLogout.css";
import { useSelector, useDispatch } from "react-redux";
import {
    setLoadingGlobal,
    setCharPerMonth,
    setCharPerReq,
    SetErrMessagesGetInfo,
    setInfoUser,
} from "../../redux/popupSlice";
const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 1,
};
const ModalLogOut = (props) => {
    const dispatch = useDispatch();
    const { openModalLogout, setOpenModalLogout, setAvatarUrl, setUserName } =
        props;

    const handleClose = () => {
        setOpenModalLogout(false);
    };

    const handleLogout = async () => {
        dispatch(setLoadingGlobal(true));
        setOpenModalLogout(false);
        await new Promise((resolve, reject) => {
            try {
                chrome.runtime.sendMessage(
                    {
                        event: "logout",
                    },
                    function (response) {
                        if (response && response.errorCode) {
                            dispatch(SetErrMessagesGetInfo(`Error! Can't logout`));
                        }
                        dispatch(
                            setInfoUser({
                                userName: null,
                                avatarUrl: null,
                            })
                        );
                        dispatch(setCharPerMonth(null));
                        dispatch(setCharPerReq(response.charPerReq || 150));
                        resolve();
                    }
                );
            } catch (error) {
                dispatch(SetErrMessagesGetInfo(`Error! Can't logout`));
                resolve();
            }
        });
        dispatch(setLoadingGlobal(false));
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModalLogout}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={openModalLogout}>
                <Box sx={style}>
                    <div className="top-modal-logout">
                        <ClearOutlinedIcon className="icon-clear" onClick={handleClose} />
                    </div>

                    <main>
                        <div className={"Main_Modal_info_logout"}>
                            <div id="default-container">
                                <div id="counter-panel-logout" className="card_logout">
                                    <div className="stats_logout">
                                        <div id="stats-page-logout">
                                            <p>Bạn muốn đăng xuất khỏi ứng dụng ?</p>
                                        </div>
                                    </div>
                                    <div className="share_logout">
                                        <Button
                                            type="submit"
                                            color="secondary"
                                            variant="outlined"
                                            onClick={handleLogout}
                                        >
                                            <CheckOutlinedIcon sx={{ marginRight: "5px" }} />
                                            Xác nhận
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={handleClose}>
                                            <CancelPresentationOutlinedIcon
                                                sx={{ marginRight: "11px" }}
                                            />
                                            Huỷ bỏ
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalLogOut;
