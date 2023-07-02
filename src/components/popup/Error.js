import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import {SetErrMessagesGetInfo } from '../../redux/popupSlice'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Error = () => {
    const dispatch = useDispatch()
    const popupState = useSelector((state) => state.popupReducer)
    const { errMessage } = popupState;

    const handleCloseSnackBar = () => {
        dispatch(SetErrMessagesGetInfo(null));
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: "center" }}
            sx={{ zIndex: 99999 }}
            open={errMessage ? true : false}
            onClose={handleCloseSnackBar}
            autoHideDuration={3500}
        >
            <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>
                {errMessage}
            </Alert>
        </Snackbar>
    );
};

export default Error;