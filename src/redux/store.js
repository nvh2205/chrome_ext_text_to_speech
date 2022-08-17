import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import textReducer from './textSlice'

const rootReducer = {
    text:textReducer
}

const store = configureStore({
    reducer:rootReducer,
})

export default store;