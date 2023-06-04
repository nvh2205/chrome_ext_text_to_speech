import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import styles from './styleShowIcon.module.css'
import Popover from '@mui/material/Popover';
import PopoverShow from './PopoverShow'
import { setText, setShowIcon, setShowPopover, setXY } from '../../redux/textSlice'

function ShowIcon(props) {
  const dispatch = useDispatch();

  const text_ = useSelector(state => state.text);
  const { top, bottom, left, y, showPopover,x } = text_;

  const style =  {
    left: `${x}px`,
    top: `${y}px`
  } 

  const onClickPopover = (event) => {

    const action = setShowPopover(true);
    dispatch(action);

    const actionShowIcon = setShowIcon(false);
    dispatch(actionShowIcon);
  }

  return (
    <div title="Text To  Speech" style={style} className={`${styles.Position_icon} ${styles.Button__btn__1lr0f}`}>
      <MicOutlinedIcon onClick={onClickPopover} />
    </div>
  );
}

export default ShowIcon;