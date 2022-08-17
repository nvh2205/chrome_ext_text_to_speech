import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import audioApi from '../services/audioApi'


const initialText = {
  selectText: [],
  showIcon: false,
  showPopover: false,
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  bottom: 0,
  arrowPositionSelect: 0,
  speaker_id: 0,
  speed_up: 1.0,
  isLoadingAudio: false,
  error: null,
  listAudio:[]
};

const text = createSlice({
  name: "text",
  initialState: initialText,
  reducers: {
    setText: (state, action) => {
      state.selectText = [...action.payload];
    },

    //Show icon when user bold highlight text
    setShowIcon: (state, action) => {
      state.showIcon = action.payload;
    },

    setShowPopover: (state, action) => {
      state.showPopover = action.payload;
    },

    setXY: (state, action) => {
      const payload = action.payload;
      state.top = payload.top ? payload.top : 0;
      state.bottom = payload.bottom ? payload.bottom : 0;
      state.left = payload.left ? payload.left : 0;
      state.arrowPositionSelect = payload.arrowPositionSelect
        ? payload.arrowPositionSelect
        : 50;
      state.x = payload.x ? payload.x : 0;
      state.y = payload.y ? payload.y : 0;
    },

    setIsLoadingAudio: (state, action) => {
      state.isLoadingAudio = action.payload;
    },
    setSpeakSpeed: (state, action) => {
      const { speaker_id, speed_up } = action.payload;

      state.speaker_id = speaker_id;
      state.speed_up = speed_up;
    },
    removeState: (state, action) => {
      state = {};
      return state;
    },
  }

});

const { reducer, actions } = text;
export const {
  setText,
  setShowIcon,
  setShowPopover,
  setXY,
  removeState,
  setIsLoadingAudio,
  setSpeakSpeed
} = actions;
export default reducer;
