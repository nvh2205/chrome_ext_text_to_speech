import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import textReducer from './textSlice'
import popupReducer from './popupSlice';
const rootReducer = {
    text:textReducer,
    popupReducer:popupReducer
}

const store = configureStore({
    reducer:rootReducer,
})

export default store;