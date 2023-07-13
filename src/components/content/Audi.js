import React, { useEffect, useState, useRef, forwardRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector, useDispatch } from "react-redux";
const Audi = (props, ref) => {
  const {
    speed,
    setPlayAudio,
    setIndexText,
    indexText,
    // onClickExecuteScrollText,
    listAudio
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
    // onClickExecuteScrollText();
  };

  const handleClickNext = async () => {
    let indexTextSelect = indexText;
    indexTextSelect =
      indexTextSelect < selectText.length - 1 ? indexTextSelect + 1 : 0;
    await setIndexText(indexTextSelect);
    // onClickExecuteScrollText();
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
    <div className={`${"audioPlayer"}`}>
      <AudioPlayer
        ref={ref}
        style={{ borderRadius: "1rem" }}
        src={listAudio[indexText]}
        onPlay={onPlay}
        onPause={onPause}
        // showSkipControls={true}
        showJumpControls={true}
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

export default forwardRef(Audi);
