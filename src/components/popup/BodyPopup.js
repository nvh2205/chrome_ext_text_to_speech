import React, { useState, useEffect } from "react";
import "./bodyPopup.css";
import PersonInfo from "./PersonInfo";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {
    setLoadingGlobal,
    setCharPerMonth,
    setCharPerReq,
    SetErrMessagesGetInfo,
    setInfoUser,
} from "../../redux/popupSlice";
import CounterPanel from "./CounterPanel";
import FormPopup from "./FormPopup";
import Audio from "./Audio";
import LinearProgress from "@mui/material/LinearProgress";
import Backdrop from "@mui/material/Backdrop";
import Error from "./Error";
import MuiAlert from "@mui/material/Alert";

// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const BodyPopup = () => {
    const dispatch = useDispatch();
    const popupState = useSelector((state) => state.popupReducer);
    const { isLoadingGlobal } = popupState;

    // const [errorMessagesGetInfo, SetErrMessagesGetInfo] = useState('');

    //Get info
    useEffect(() => {
        const getInfoUser = async () => {
            dispatch(setLoadingGlobal(true));
            await new Promise((resolve, reject) => {
                try {
                    chrome.runtime.sendMessage(
                        {
                            event: "info",
                        },
                        function (response) {
                            if (!response || response && response.errorCode) {
                                dispatch(SetErrMessagesGetInfo(`Error! ${response.message}`));
                            }
                            dispatch(
                                setInfoUser({
                                    username: response.fullName || null,
                                    avatarUrl: response.avatarUrl || null,
                                })
                            );

                            dispatch(setCharPerMonth(response.charPerMonth || null));
                            dispatch(setCharPerReq(response.charPerReq || 150));
                            resolve();
                        }
                    );
                } catch (error) {
                    dispatch(SetErrMessagesGetInfo("Error! Không thể lấy thông tin"));
                    resolve();
                }
            });
            dispatch(setLoadingGlobal(false));
        };
        getInfoUser();
    }, []);

    const handleCloseSnackBar = () => {
        SetErrMessagesGetInfo(null);
    };

    return (
        <div className="body-popup">
            {/* Error get info user when open open poup first */}
            <Error />

            {/* Loading g */}
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoadingGlobal}
            >
                <CircularProgress sx={{ marginTop: "-25%" }} color="secondary" />
            </Backdrop>

            <PersonInfo />

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
