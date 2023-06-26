import React, { useEffect, useState } from 'react';
import './formPopup.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from "react-redux";
import { setLoadingAudio, setCharPerMonth, setCharPerReq, setLinkAudio } from '../../redux/popupSlice'
import Collapse from '@mui/material/Collapse';

const FormPopup = () => {
    const dispatch = useDispatch();
    const popupState = useSelector((state) => state.popupReducer)
    const { isLoadingAudio, charPerReq, charPerMonth, speaker_id } = popupState;

    const [inputText, setInputText] = useState("");
    const [errGetAudio, setErrGetAudio] = useState("");

    //Open alert error
    const handleOpenAlert = () => {
        setErrGetAudio("")
    }

    const handleSubmit = async (e) => {
        if (inputText == "") {
            return
        }
        if (isLoadingAudio) return;
        dispatch(setLoadingAudio(true));

        let arrText = inputText.split(" ");
        //validate char per req (Cut text if char number is greater than charPer)
        arrText = arrText.length > charPerReq ? arrText.splice(0, charPerReq) : arrText;

        //Validate char numbers in text with charPerMonth
        if (setCharPerMonth && arrText.length > setCharPerMonth) {
            setErrGetAudio("Số ký tự trong tháng không đủ")
            dispatch(setLoadingAudio(false));
            return;
        }
        const data = {
            textOrigin: arrText.join(" "),
            speakerId: speaker_id,
        }
        await new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({
                event: "audio",
                data: data
            }, function (response) {
                if (response.errorCode || response.statusCode) {
                    setErrGetAudio("Không thể get được audio")
                    resolve();
                } else {
                    const linkAudio = `${process.env.REACT_APP_API_URL}/${response.data}`;
                    dispatch(setLinkAudio(linkAudio));
                    //Set char per month when get audio successfully
                    if (charPerMonth) {
                        const numberCharRemaining = charPerMonth - arrText.length;
                        dispatch(setCharPerMonth(numberCharRemaining));
                    }

                    resolve();
                }
            });
        })

        dispatch(setLoadingAudio(false));
    }

    useEffect(() => {
        async function getAudio() {
            await handleSubmit();
        }
        getAudio();
    }, [speaker_id])

    return (
        <div className="form">
            <TextField
                id="filled-multiline-static"
                label="Text"
                multiline
                rows={3.5}
                variant="filled"
                className='text-field'
                color="secondary"
                value={inputText}
                onInput={e => setInputText(e.target.value)}
            />


            {!errGetAudio ? <Button type="submit" onClick={handleSubmit}>
                {isLoadingAudio ? <img className='img-loading' src={"./icons8-refresh.gif"} /> :
                    <svg className='svg-button' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                        <path d="M 20 4 C 14.507813 4 10 8.507813 10 14 L 10 31.75 L 7.125 28.875 L 4.3125 31.71875 L 12 39.40625 L 19.6875 31.71875 L 16.875 28.90625 L 14 31.75 L 14 14 C 14 10.691406 16.691406 8 20 8 L 31 8 L 31 4 Z M 38 10.59375 L 30.28125 18.3125 L 33.125 21.125 L 36 18.25 L 36 36 C 36 39.308594 33.308594 42 30 42 L 19 42 L 19 46 L 30 46 C 35.492188 46 40 41.492188 40 36 L 40 18.25 L 42.875 21.125 L 45.6875 18.28125 Z"></path>
                    </svg>}

            </Button> :
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleOpenAlert}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    severity="error"
                    sx={{ mb: 0.5, mt: 0.5 }}

                >
                    <strong>Error!</strong> {errGetAudio}
                </Alert>}
        </div>
    );
};

export default FormPopup;