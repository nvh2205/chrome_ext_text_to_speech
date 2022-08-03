import React, { useEffect, useState, useRef } from "react";
import styles from "./popover.module.css";
import Popover from "@mui/material/Popover";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import {
  setText,
  setShowIcon,
  setShowPopover,
  setXY,
} from "../../redux/textSlice";
import { useSelector, useDispatch } from "react-redux";
import Audi from "./Audi";
import Draggable from "react-draggable";
import audioApi from "../../services/audioApi";
import axios from "axios";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";

function PopoverShow(props, ref) {
  //width and Height of Popover
  const { widthPop } = props;

  const dispatch = useDispatch();

  const text_ = useSelector((state) => state.text);
  const {
    top,
    bottom,
    left,
    y,
    x,
    showPopover,
    arrowPositionSelect,
    selectText,
  } = text_;

  const style =
    top > 0
      ? {
          left: `${left}px`,
          top: `${top}px`,
        }
      : {
          left: `${left}px`,
          bottom: `${bottom}px`,
        };

  const [optionSpeed, setOptionSpeed] = useState([
    0.25, 0.5, 0.75, 1, 1.25, 1.5, 2.0,
  ]);
  const [speed, setSpeed] = useState(1);

  //index of the text to choose to play the audio
  const [indexText, setIndexText] = useState(0);

  const clickOptionSpeed = (popupState, optionSpeed) => {
    popupState.close();
    setSpeed(optionSpeed);
  };

  const tagOptionSpeed = (popupState, optionSpeed, speed) => {
    let result = optionSpeed.filter((item) => item != speed);
    return result.map((item, index) => (
      <MenuItem
        key={index}
        onClick={() => {
          clickOptionSpeed(popupState, item);
        }}
        sx={{ borderBottom: "1px dotted #9b698d", color: "#48742c" }}
      >
        {" "}
        <SpeedOutlinedIcon sx={{ marginRight: "5px" }} /> x{item}
      </MenuItem>
    ));
  };

  const handleClose = () => {
    const action = setShowPopover(false);
    dispatch(action);
  };

  const id = showPopover ? "simple-popover" : undefined;

  //Drag-Drop component
  const nodeRef = useRef(null);

  //Ref icon next to text to play pause audio
  const refIconPlay = useRef(null);

  //Play icon to play pause Audio
  const [playAudio, setPlayAudio] = useState(false);

  //ref to scroll to an element while playing music
  const refElementScrollText = useRef(null);

  const elementRef = useRef();
  const [heightPop, setHeightPop] = useState(0);

  //Get the height of the pop and set the pop's drag when clicking outside the pop
  useEffect(() => {
    const setPopoverTimeOut = setTimeout(() => {
      const divElement = showPopover && elementRef.current;
      setHeightPop(divElement.clientHeight);

      //Hide default popover position in left corner of screen
      const hiddenPopoverDefault = document.getElementsByClassName(
        "css-3bmhjh-MuiPaper-root-MuiPopover-paper"
      )[0];
      hiddenPopoverDefault.style["min-width"] = "1px";

      //The element when clicked out will turn off the popver
      const tagClosePopover = document.getElementsByClassName(
        "MuiBackdrop-invisible"
      )[0];
      tagClosePopover.style.width = `${2 * window.innerHeight}px`;
      tagClosePopover.style.height = `${2 * window.innerWidth}px`;
    });

    return () => {
      clearTimeout(setPopoverTimeOut);
    };
  }, [showPopover]);

  //Play icon to play audio
  const clickIconToPlayAudio = (e) => {
    const currentIndex = Number(e.currentTarget.id.split("_")[2]);
    const checkPlay = playAudio;

    setIndexText(currentIndex);
    setPlayAudio(!checkPlay);

    !checkPlay
      ? refIconPlay.current.audio.current.play()
      : refIconPlay.current.audio.current.pause();
  };

  //scroll to an element while playing music
  const onClickExecuteScrollText = () => {
    refElementScrollText.current.scrollIntoView();
  };

  //Call api
  useEffect(() => {
    // const fetchAudio=async() => {
    //   try {
    //     const data=new FormData();
    //     data.append("text",selectText);
    //     const res= await audioApi.postTextConvertAudio(data);

    //     console.log(res);

    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }
    // fetchAudio();

    const fetchAudio = async () => {
      const data = new FormData();
      data.append("text", selectText);

      try {
        const res = await axios.post(
          "https://demo.corenlp.admicro.vn/tts_multispeakers_demo_2/vangt",
          data
        );
        console.log(res);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAudio();
  }, [selectText]);

  const disPlayText = () => {
    const result = selectText.map((item, index) => {
      return (
        <div
          key={index}
          ref={index == indexText ? refElementScrollText : null}
          className={`${
            indexText == index ? styles.display_text_play : styles.display_text
          }`}
        >
          {playAudio && indexText == index ? (
            <PauseCircleOutlineOutlinedIcon
              className={styles.display_text_icon}
              onClick={clickIconToPlayAudio}
              id={`Text_to_${index}`}
            />
          ) : (
            <PlayCircleFilledWhiteOutlinedIcon
              className={styles.display_text_icon}
              onClick={clickIconToPlayAudio}
              id={`Text_to_${index}`}
            />
          )}
          <p
            style={
              indexText == index
                ? { marginLeft: "15px", textDecoration: "underline" }
                : { marginLeft: "15px" }
            }
          >
            {item}
          </p>
        </div>
      );
    });
    return result;
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      //onStop={handleStop}
      bounds={
        top > 0
          ? {
              top: -top,
              left: -left + widthPop / 2,
              right: window.innerWidth - left - widthPop / 2,
              bottom: window.innerHeight - top - heightPop,
            }
          : {
              bottom: bottom - 15,
              left: -left + widthPop / 2,
              right: window.innerWidth - left - widthPop / 2,
              top: -window.innerHeight + bottom + heightPop,
            }
      }
      positions={null}
      handle="#strong"
    >
      <Popover
        id={id}
        open={showPopover}
        onClose={handleClose}
        ref={nodeRef}
        disableScrollLock={true}
      >
        <section
          className={`${
            top ? styles.Text__wrapper : styles.Text__wrapper_bottom
          }`}
          data-popup-direction="downward"
        >
          <section
            ref={elementRef}
            data-translatex="-50%"
            className={`${styles.Text__translation_popup}`}
            style={style}
          >
            <div
              className={`${
                top ? styles.Text__arrow : styles.Text__arrow_bottom
              }`}
              style={{ left: `${arrowPositionSelect}%` }}
            ></div>

            {/* Header popover */}
            <section className={`${styles.Text__header}`} id="strong">
              <div
                data-hook="content-page.save-card"
                title="Save as a card"
                className={`${styles.Text__btn}  ${styles.Text__disabled} ${styles.Button__btn__1lr0f} ${styles.Button__disabled__38AlQ}`}
                tabIndex={-1}
              >
                <HeadsetMicIcon sx={{ marginTop: "2px" }} />
              </div>

              <section className={`${styles.Text__languages}`}>
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Button variant="outlined" {...bindTrigger(popupState)}>
                        Playback Speed
                        <SpeedOutlinedIcon
                          sx={{ marginRight: "5px", marginLeft: "5px" }}
                        />{" "}
                        x{speed}
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        {tagOptionSpeed(popupState, optionSpeed, speed)}
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </section>

              <div
                data-hook="content-page.close-Text"
                title="Cancel"
                className={`${styles.Text__btn} ${styles.Button__btn__1lr0f}`}
                tabIndex={0}
              >
                <HighlightOffOutlinedIcon sx={{ marginTop: "2px" }} />
              </div>
            </section>

            {/* Content popover */}
            <section
              data-hook="Text_wrapper"
              className={`${styles.Text__content_body}`}
            >
              <section
                data-hook="Text-original-section"
                className={`${styles.Text__original}`}
              >
                {/* react-text: 240 */}
                {disPlayText()}
                {/* /react-text */}
              </section>
              <section className={`${styles.Text__translations}`}>
                <section
                  data-hook="translation-view.pos-section"
                  className={`${styles.Text__pos_wrapper}`}
                >
                  <section className={`${styles.Text__pos_header}`}>
                    {/* react-text: 244 */}Text{/* /react-text */}
                  </section>

                  {/* Audio */}
                  <section className={`${styles.Text__term_line}`}>
                    <Audi
                      speed={speed}
                      ref={refIconPlay}
                      setPlayAudio={setPlayAudio}
                      setIndexText={setIndexText}
                      indexText={indexText}
                      onClickExecuteScrollText={onClickExecuteScrollText}
                    />
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
      </Popover>
    </Draggable>
  );
}

export default PopoverShow;
