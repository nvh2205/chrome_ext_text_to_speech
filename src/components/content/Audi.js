// https://github.com/lhz516/react-h5-audio-player#readme
// https://www.bensound.com/
import React, { useEffect, useState, useRef, forwardRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "./audio.module.css";
import { useSelector, useDispatch } from "react-redux";

const Audi = (props, ref) => {
  const musicTracks = [
    {
      name: "Memories",
      src: "https://pega-audio.mediacdn.vn/./Grad_tts/out/20220801212958.m4a",
    },
    {
      name: "Creative Minds",
      src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
    },
    {
      name: "Acoustic Breeze",
      src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
    },
    {
      name: "Sunny",
      src: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
    },
    {
      name: "Tenderness",
      src: "https://www.bensound.com/bensound-music/bensound-tenderness.mp3",
    },
    {
      name: "Once Again",
      src: "https://www.bensound.com/bensound-music/bensound-onceagain.mp3",
    },
    {
      name: "Sweet",
      src: "https://www.bensound.com/bensound-music/bensound-sweet.mp3",
    },
    {
      name: "Love",
      src: "https://www.bensound.com/bensound-music/bensound-love.mp3",
    },
    {
      name: "Piano Moment",
      src: "https://www.bensound.com/bensound-music/bensound-pianomoment.mp3",
    },
    {
      name: "E.R.F",
      src: "https://www.bensound.com/bensound-music/bensound-erf.mp3",
    },
    {
      name: "Dreams",
      src: "https://www.bensound.com/bensound-music/bensound-dreams.mp3",
    },
    {
      name: "A Day To Remember",
      src: "https://www.bensound.com/royalty-free-music/track/a-day-to-remember-wedding-music",
    },
    {
      name: "Adventure",
      src: "https://www.bensound.com/bensound-music/bensound-adventure.mp3",
    },
    {
      name: "Photo Album",
      src: "https://www.bensound.com/bensound-music/bensound-photoalbum.mp3",
    },
    {
      name: "November",
      src: "https://www.bensound.com/bensound-music/bensound-november.mp3",
    },
  ];

  const {
    speed,
    setPlayAudio,
    setIndexText,
    indexText,
    onClickExecuteScrollText,
  } = props;

  const text_ = useSelector((state) => state.text);
  const { selectText } = text_;

  const [trackIndex, setTrackIndex] = useState(0);

  const handleClickPrevious =async () => {
    // setTrackIndex((currentTrack) =>
    //   currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
    // );
    let indexTextSelect = indexText;
    indexTextSelect =
      indexTextSelect === 0 ? selectText.length - 1 : indexTextSelect - 1;
    await setIndexText(indexTextSelect);
    onClickExecuteScrollText();
  };

  const handleClickNext = async () => {
    let indexTextSelect = indexText;
    indexTextSelect =
      indexTextSelect < selectText.length - 1 ? indexTextSelect + 1 : 0;
    await setIndexText(indexTextSelect);
    onClickExecuteScrollText();
  };

  //On play when user play audio
  const onPlay = () => {
    ref.current.audio.current.playbackRate = speed;
    setPlayAudio(true);
  };

  const onPause = () => {
    setPlayAudio(false);
  };

  useEffect(() => {
    ref.current.audio.current.playbackRate = speed;
  }, [speed]);

  return (
    <div className={`${styles.audioPlayer}`}>
      <AudioPlayer
        ref={ref}
        style={{ borderRadius: "1rem" }}
        src={musicTracks[trackIndex].src}
        onPlay={onPlay}
        onPause={onPause}
        showSkipControls={true}
        showJumpControls={true}
        //header={`Now playing: ${musicTracks[trackIndex].name}`}
        //footer="All music from: www.bensound.com"
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
        // other props here
      />
    </div>
  );
};

export default forwardRef(Audi);
