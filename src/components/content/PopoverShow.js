import React, { useEffect, useState, useRef } from "react";
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
  setIsLoadingAudio,
  setCharPerMonth
} from "../../redux/textSlice";
import { useSelector, useDispatch } from "react-redux";
import Audi from "./Audi";
import Draggable from "react-draggable";
import audioApi from "../../services/audioApi";
import axios from "axios";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ModalSetting from "./ModalSetting";
import Popper from '@mui/material/Popper';
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
    speaker_id,
    speed_up,
    isLoadingAudio,
    charPerReq,
    charPerMonth
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

  const id = showPopover ? "simple-popover-id" : undefined;

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

  //Open modal setting
  const [openModalSetting, setOpenModalSetting] = useState(false);

  //Audio when call api
  const [listAudio, setListAudio] = useState([]);

  const [errLoadingCallAudio, setErrLoadingCallAudio] = useState(false);

  //check the number of signatures in the month is enough
  // compared to the number of characters being selected
  //True is enough
  //False is not enough
  const [checkNumberOfCharacters, setCheckNumberOfCharacters] = useState(true);

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

  //Get the height of the pop and set the pop's drag when clicking outside the pop
  useEffect(() => {
    const setPopoverTimeOut = setTimeout(() => {
      const divElement = showPopover && elementRef.current;
      setHeightPop(divElement.clientHeight);
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
  // const onClickExecuteScrollText = () => {
  //   refElementScrollText.current.scrollIntoView();
  // };

  //Opend modal setting
  const handleOpenModalSetting = async () => {
    setOpenModalSetting(true);
  };

  //Call api
  useEffect(() => {
    const fetchAudio = async () => {
      const actionSetLoadingAudio = setIsLoadingAudio(true);
      dispatch(actionSetLoadingAudio);

      const data = {
        textOrigin: selectText,
        speedUp: speed_up,
        speakerId: speaker_id,
      }
      const dataRes = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
          event: "audio",
          data: data
        }, function (response) {
          if (!response || response.errorCode || response.statusCode) {
            resolve('error');
          } else {
            resolve(response);
          }
        });
      })

      //Version old listAudio is array 
      const listAudio = [];
      if (typeof dataRes != 'string') {
        listAudio.push(`${process.env.REACT_APP_API_URL}/${dataRes.data}`)
      } else {
        //If err
        listAudio.push(dataRes);
      }
      // const listAudio = ["https://tts-app.site/static/out_audio/aedbc800-9e64-441e-94da-1d633052176b.wav"]
      const actionSetLoadingAudioF = setIsLoadingAudio(false);
      dispatch(actionSetLoadingAudioF);
      setListAudio(listAudio);

      //number of characters in the remaining 1 month
      if (charPerMonth) {
        const numberCharRemaining = charPerMonth - selectText.split(" ").length;
        const actionCharPerMonth = setCharPerMonth(numberCharRemaining);
        dispatch(actionCharPerMonth);
      }
    };
    if (charPerMonth && charPerMonth < selectText.split(" ").length) {
      //Set audio is error when char per month not enough length of selected
      setListAudio(["error"]);
      setCheckNumberOfCharacters(false);
    } else {
      // setListAudio(["error"]);
      // setCheckNumberOfCharacters(false);
      fetchAudio();
    }

    return () => {
      const actionSetLoadingAudioT = setIsLoadingAudio(true);
      dispatch(actionSetLoadingAudioT);
    };
  }, [selectText, speaker_id, speed_up]);
  //Err when call api
  useEffect(() => {
    const err = listAudio.find((item) => item == "error");
    err ? setErrLoadingCallAudio(true) : setErrLoadingCallAudio(false);
  }, [listAudio]);

  const disPlayText = () => {
    const arrText = [selectText]
    const result = arrText.map((item, index) => {
      return (
        <div
          key={index}
          ref={index == indexText ? refElementScrollText : null}
          className={`${indexText == index ? "display_text_play" : "display_text"
            }`}
        >
          {listAudio.length > 0 && !isLoadingAudio ? (
            errLoadingCallAudio ? (
              <WarningAmberOutlinedIcon
                className={"display_text_icon"}
                id={`Text_to_${index}`}
              />
            ) : playAudio && indexText == index ? (
              <PauseCircleOutlineOutlinedIcon
                className={"display_text_icon"}
                onClick={clickIconToPlayAudio}
                id={`Text_to_${index}`}
              />
            ) : (
              <PlayCircleFilledWhiteOutlinedIcon
                className={"display_text_icon"}
                onClick={clickIconToPlayAudio}
                id={`Text_to_${index}`}
              />
            )
          ) : (
            <CircularProgress
              color="secondary"
              className={"display_text_icon"}
            />
          )}
          <p
            style={
              indexText == index
                ? {
                  fontSize: "17px",
                  marginLeft: "15px",
                  // textDecoration: "underline",
                  textAlign: "15px",
                  whiteSpace: "pre-line"
                }
                : { marginLeft: "15px", textAlign: "15px" }
            }
          >
            {item}
          </p>
        </div>
      );
    });
    return result;
  };

  const hancleClosePopover = () => {
    // const action = setShowPopover(true);
    // dispatch(action);
    console.log("123213123");
  };

  const eventHandler = (e, data) => {
    console.log("Event Type", e.type);
    console.log({ e, data });
  };

  return (

    <Draggable
      nodeRef={nodeRef}
      // onStop={eventHandler}
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
      <Popper
        id={id}
        open={showPopover}
        // onClose={handleClose}
        ref={nodeRef}
        disableScrollLock={true}
        sx={{zIndex:1234,top:'0px',left:'0px',bottom:'0px'}}
      >
        <section
          className={`${top ? "Text__wrapper" : "Text__wrapper_bottom"
            }`}
          data-popup-direction="downward"
        >
          <section
            ref={elementRef}
            data-translatex="-50%"
            className={`${"Text__translation_popup"}`}
            style={style}
          >
            <div
              className={`${top ? "Text__arrow" : "Text__arrow_bottom"
                }`}
              style={{ left: `${arrowPositionSelect}%` }}
            ></div>

            {/* Header popover */}
            <section className={"Text__header"} id="strong">
              <div
                data-hook="content-page.save-card"
                title="Setting"
                className={`${"Text__btn"}  ${"Text__disabled"} ${"Button__btn__1lr0f"} ${"Button__disabled__38AlQ"}`}
                tabIndex={-1}
              >
                <SettingsOutlinedIcon
                  onClick={handleOpenModalSetting}
                  sx={{ marginTop: "2px" }}
                  className={`${"Icon_settings"}`}
                />

                <ModalSetting
                  openModalSetting={openModalSetting}
                  setOpenModalSetting={setOpenModalSetting}
                />

              </div>

              <section className={`${"Text__languages"}`}>
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
                className={`${"Text__btn"} ${"Button__btn__1lr0f"}`}
                tabIndex={0}
              >
                <HighlightOffOutlinedIcon
                  className={`${"Icon_settings"}`}
                  sx={{ marginTop: "2px" }}
                  onClick={handleClose}
                />
              </div>
            </section>

            {/* Content popover */}
            <section
              data-hook="Text_wrapper"
              className={`${"Text__content_body"}`}
            >
              <section
                data-hook="Text-original-section"
                className={`${"Text__original"}`}
              >
                {/* react-text: 240 */}
                {disPlayText()}
                {/* /react-text */}
              </section>
              <section className={`${"Text__translations"}`}>
                <section
                  data-hook="translation-view.pos-section"
                  className={`${"Text__pos_wrapper"}`}
                >
                  <section className={`${"Text__pos_header"}`}>
                    {selectText.split(" ").length}/{charPerReq} Word
                    {/* react-text: 244 */}{/* /react-text */}
                  </section>

                  {/* Audio */}
                  <section className={`${"Text__term_line"}`}>
                    {errLoadingCallAudio ? (
                      <div style={{ color: "red" }}>
                        <WarningAmberOutlinedIcon /> Không thể tải được audio
                        (Error) <WarningAmberOutlinedIcon />
                        {/* If not enough char per month */}
                        {!checkNumberOfCharacters && (<div>
                          <WarningAmberOutlinedIcon /> Bạn đã dùng hết số lượng ký tự trên một tháng
                          (Error) <WarningAmberOutlinedIcon />
                          <Button color="secondary" style={{ marginTop: "10px" }} variant="outlined">Nâng Cấp Ngay</Button>
                        </div>)}
                      </div>
                    ) : listAudio.length > 0 && !isLoadingAudio ? (
                      <Audi
                        listAudio={listAudio}
                        speed={speed}
                        ref={refIconPlay}
                        setPlayAudio={setPlayAudio}
                        setIndexText={setIndexText}
                        indexText={indexText}
                      // onClickExecuteScrollText={onClickExecuteScrollText}
                      />
                    ) : (
                      <CircularProgress color="secondary" />
                    )}
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
      </Popper>

    </Draggable>

  );
}

export default PopoverShow;
