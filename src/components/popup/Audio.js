import React, { useEffect, useState, useRef, forwardRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "./audio.css";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress from '@mui/material/LinearProgress';

const Audio = (props) => {
  const {
    speed = 1,
    listAudio = ["https://pega-audio.mediacdn.vn/./Grad_tts/out/20220801212958.m4a"]
  } = props;

  const ref = useRef(null);
  const popupState = useSelector((state) => state.popupReducer)
  const { isLoadingAudio, speed_up } = popupState;

  //On play when user play audio
  const onPlay = () => {
    ref.current.audio.current.playbackRate = speed_up;
  };

  useEffect(() => {
    ref.current.audio.current.playbackRate = speed_up;
  }, [speed_up]);

  return (
    <div className="audioPlayer">
      {isLoadingAudio && <LinearProgress className="progress-audio" color="secondary" />}
      <AudioPlayer
        ref={ref}
        style={{ borderRadius: "6px" }}
        src={listAudio[0]}
        onPlay={onPlay}
        // showSkipControls={true}
        showJumpControls={true}
        className={`player ${isLoadingAudio && 'loading-audio'}`}
      // header={`Now playing: ${listAudio[indexText].name}`}
      //footer="All music from: www.bensound.com"
      // onClickPrevious={handleClickPrevious}
      // onClickNext={handleClickNext}
      // onEnded={handleClickNext}
      // other props here
      />
    </div>
  );
};

export default Audio;
