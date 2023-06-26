import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    isLoadingGlobal: false,
    //deafult is 100 characters
    charPerReq: 100,
    charPerMonth: null,
    isLoadingAudio: false,
    linkAudio: '',
    speaker_id: 1,
    speed_up: 1,
};

const popupSlice = createSlice({
    name: "popupState",
    initialState: initialState,
    reducers: {
        setLoadingGlobal: (state, action) => {
            state.isLoadingGlobal = action.payload;
        },
        setCharPerReq: (state, action) => {
            state.charPerReq = action.payload;
        },
        setCharPerMonth: (state, action) => {
            state.charPerMonth = action.payload;
        },
        setLoadingAudio: (state, action) => {
            state.isLoadingAudio = action.payload;
        },
        setLinkAudio: (state, action) => {
            state.linkAudio = action.payload
        },
        setSpeakSpeed: (state, action) => {
            const { speaker_id, speed_up } = action.payload;

            state.speaker_id = speaker_id;
            state.speed_up = speed_up;
        },
    }

});

const { reducer, actions } = popupSlice;
export const {
    setLoadingGlobal,
    setCharPerMonth,
    setCharPerReq,
    setLoadingAudio,
    setLinkAudio,
    setSpeakSpeed,
} = actions;
export default reducer;
