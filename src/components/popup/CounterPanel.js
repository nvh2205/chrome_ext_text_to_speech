import React from 'react';
import './counter-panel.css'
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import MovingIcon from '@mui/icons-material/Moving';
const CounterPanel = () => {
    const popupState = useSelector((state) => state.popupReducer)
    const { charPerReq, charPerMonth } = popupState;

    return (
        <div id="counter-panel" className="card">
            <div className="stats">
                <div id="stats-page">
                    <span data-i18n="stats_label_page">ký tự/1 request</span>
                    <strong className="amount">{charPerReq}</strong>
                </div>
                <div id="stats-total">
                    <span data-i18n="stats_label_total">ký tự/tháng   </span>
                    <strong className="amount">{charPerMonth||'----'}</strong>
                </div>
            </div>
            <div className="share">
                <div className="stack">
                    <Button variant="outlined" color='secondary'>Nâng Cấp Gói <MovingIcon sx={{marginLeft:"5px"}}/></Button>
                </div>
            </div>
        </div>
    );
};

export default CounterPanel;