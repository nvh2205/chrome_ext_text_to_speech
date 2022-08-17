import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import audioApi from '../services/audioApi'

export const fetchJobDetail = createAsyncThunk(
    'text/fetch_audio',
    async (data, thunkParams) => {
      const response =await audioApi.postTextConvertAudio(data);
      return response.data
    }
)

const initialState = {
    listAudio: [],
    loading: true,
    error: null
}

const reducer = createReducer(initialState, {
    [fetchJobDetail.pending]: (state, action) => state.loading = true,
    [fetchJobDetail.fulfilled]: (state, action) => {
        state.loading = false
        state.listAudio = action.payload
    },
    [fetchJobDetail.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload
    }
})