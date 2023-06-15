import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    isLoadingGlobal: false
};

const popupSlice = createSlice({
    name: "popupState",
    initialState: initialState,
    reducers: {
        setLoadingGlobal: (state, action) => {
            state.isLoadingGlobal = action.payload;
        },
    }

});

const { reducer, actions } = popupSlice;
export const {
    setLoadingGlobal
} = actions;
export default reducer;
