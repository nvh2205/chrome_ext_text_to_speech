import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setIsLoadingAudio, setSpeakSpeed } from "../../redux/textSlice";

import "./modalSetting.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 1,
};

const accent = [
  {
    speaker_id: 0,
    label: "Nữ",
  },
  {
    speaker_id: 1,
    label: "Nam",
  },
];

const minSpeedSpeech = 0.25;
const maxSpeedSpeech = 3;

const ModalSetting = (props) => {

  const form=useRef("form");

  const { openModalSetting, setOpenModalSetting } = props;
  const handleClose = () => setOpenModalSetting(false);

  const [speekerId, setSpeekerId] = useState(0);

  const handleChangeSelectSpeekerId = (event) => {
    setSpeekerId(event.target.value);
  };

  const [speedSpeech, setSeedSpeech] = useState(1.0);
  const handleChangeInputSpeed = (event) => {
    let value = event.target.value;
    setSeedSpeech(value);
  };

  const text_ = useSelector((state) => state.text);
  const { speaker_id, speed_up } = text_;
  const dispatch = useDispatch();

  const handleSubmitSetting = async (e) => {
    e.preventDefault();
    setOpenModalSetting(false)

    const actionSetLoadingAudio = setIsLoadingAudio(true);
    dispatch(actionSetLoadingAudio);

    const actionSetSpeakSpeed = setSpeakSpeed({
      speaker_id: speekerId,
      speed_up: speedSpeech,
    });
    dispatch(actionSetSpeakSpeed);
  };
  //set speed and speaker_id when modal setting modal appears
  useEffect(() => {
    setSeedSpeech(speed_up);
    setSpeekerId(speaker_id);
  }, []);

  const handleClickDefaultSetting=() => {
    setSeedSpeech(1.0);
    setSpeekerId(0);
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModalSetting}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalSetting}>
        <Box sx={style}>
          <div className="top-container">
            <header className="Header_Modal">
              <img src="../../img/text_to_speech.png" alt="" />
              <h2 className={"Header_Modal_Title"}> Setting Text To Speech</h2>
            </header>
            <ClearOutlinedIcon className="icon-clear" onClick={handleClose} />
          </div>

          {/* Main modal */}
          <main>
            <ValidatorForm onSubmit={handleSubmitSetting} ref={form}>
              
              <div className={"Main_Modal_info"}>
                <div id="default-container">
                  <div id="counter-panel" className="card">
                    <div className="stats">
                      <div id="stats-page">
                        <InputLabel id="demo-simple-select-standard-label">
                          Giọng đọc
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={speekerId}
                          onChange={handleChangeSelectSpeekerId}
                          displayEmpty
                          color="secondary"
                          sx={{ width: "100%" }}
                        >
                          {accent.map((item, index) => {
                            return index == 0 ? (
                              <MenuItem key={index} value={item.speaker_id}>
                                <em> {item.label}</em>
                              </MenuItem>
                            ) : (
                              <MenuItem key={index} value={item.speaker_id}>
                                {item.label}
                              </MenuItem>
                            );
                          })}
                        </Select>

                        {/* <InputLabel id="demo-simple-select-standard-label">
                          Giọng đọc
                        </InputLabel> */}
                        {/* <TextField
                          sx={{ marginTop: "20px" }}
                          required
                          id="standard-basic"
                          label="Tốc độ đọc"
                          variant="standard"
                          value={speedSpeech}
                          onChange={handleChangeInputSpeed}
                          type="number"
                          color="secondary"
                        /> */}
                        <TextValidator
                          sx={{ marginTop: "20px" }}
                          variant="standard"
                          color="secondary"
                          label="Tốc độ đọc"
                          name="speedSpeech"
                          onChange={handleChangeInputSpeed}
                          validators={[
                            "required",
                            "minNumber:0",
                            "maxNumber:3",
                            "matchRegexp:^[0-9]$",
                          ]}
                          errorMessages={[
                            "Không được để trống!",
                            "Tốc độ đọc phải lơn hơn 0!",
                            "Tốc độ đọc phải nhỏ hơn 3!",
                            "Chỉ nhận số",
                          ]}
                          value={speedSpeech}
                        />
                      </div>
                    </div>
                    <div className="share">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="outlined"
                      >
                        <CheckOutlinedIcon sx={{ marginRight: "5px" }} />
                        Xác nhận
                      </Button>
                      <Button variant="outlined" color="success" onClick={handleClickDefaultSetting}>
                        <CancelPresentationOutlinedIcon
                          sx={{ marginRight: "5px" }}
                        />
                        Mặc định
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ValidatorForm>
          </main>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalSetting;
