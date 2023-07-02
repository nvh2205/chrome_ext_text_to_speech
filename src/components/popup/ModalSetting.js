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
import { setSpeakSpeed } from "../../redux/popupSlice";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";

import "./modalSetting.css";
import { Menu } from "@mui/material";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 1,
};

const accent = [
  {
    speaker_id: 1,
    label: "Nữ",
  },
  {
    speaker_id: 0,
    label: "Nam",
  },
];

const optionSpeed = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2.0];

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    }
  }
};
const ModalSetting = (props) => {
  const form = useRef("form");

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

  const text_ = useSelector((state) => state.popupReducer);
  const { speaker_id, speed_up } = text_;
  const dispatch = useDispatch();

  const handleSubmitSetting = async (e) => {
    e.preventDefault();
    setOpenModalSetting(false);

    // const actionSetLoadingAudio = setIsLoadingAudio(true);
    // dispatch(actionSetLoadingAudio);

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

  const handleClickDefaultSetting = () => {
    setSeedSpeech(1.0);
    setSpeekerId(0);
  };

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
              <img src="../../text_to_speech.png" alt="" />
              <h2 className={"Header_Modal_Title"}> Setting Text To Speech</h2>
            </header>
            <ClearOutlinedIcon className="icon-clear" onClick={handleClose} />
          </div>

          {/* Main modal */}
          <main>
            <ValidatorForm onSubmit={handleSubmitSetting} ref={form}>
              <div className={"Main_Modal_info"}>
                <div id="default-container">
                  <div id="counter-panel-modal" className="card_modal">
                    <div className="stats_modal">
                      <div id="stats-page">
                        <TextField
                          value={speekerId}
                          onChange={handleChangeSelectSpeekerId}
                          color="secondary"
                          sx={{ width: "100%" }}
                          select
                          label="Giọng Đọc"
                        >
                          {accent.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.speaker_id}>
                                <em> {item.label}</em>
                              </MenuItem>
                            )
                          })}
                        </TextField>

                        <FormControl sx={{ minWidth: "100%", marginTop: "25px" }}>
                          <InputLabel color="secondary" id="demo-simple-select-standard-label">
                            Tốc Độ
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={speedSpeech}
                            onChange={handleChangeInputSpeed}
                            displayEmpty
                            color="secondary"
                            sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                            input={<OutlinedInput color="secondary" label="Tốc Độ" />}
                            MenuProps={MenuProps}
                          >
                            {optionSpeed.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item}>
                                  <SpeedOutlinedIcon
                                    sx={{
                                      marginRight: "5px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <em> X{item}</em>
                                </MenuItem>
                              )
                            })}

                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className="share_modal">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="outlined"
                        size="small"
                        sx={{ marginRight: "10px" }}
                      >
                        <CheckOutlinedIcon sx={{ marginRight: "5px" }} />
                        Xác nhận
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={handleClose}
                      >
                        <CancelPresentationOutlinedIcon
                          sx={{ marginRight: "8px" }}
                        />
                        Huỷ Bỏ
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
