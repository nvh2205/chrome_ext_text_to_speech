import { createSlice } from "@reduxjs/toolkit";

const initialText = {
    selectText: '',
    showIcon: false,
    showPopover: false,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    bottom: 0,
    arrowPositionSelect:0
};

const text = createSlice({
    name: 'text',
    initialState: initialText,
    reducers: {
        setText: (state, action) => {
            state.selectText = action.payload;
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
            state.top = payload.top;
            state.bottom = payload.bottom;
            state.left = payload.left;
            state.arrowPositionSelect= payload.arrowPositionSelect;
            state.x=payload.x;
            state.y=payload.y;
        },

        removeState: (state, action) => {
            state = {};
            return state;
        }

    }
})

const { reducer, actions } = text;
export const { setText, setShowIcon, setShowPopover, setXY , removeState } = actions;
export default reducer;
