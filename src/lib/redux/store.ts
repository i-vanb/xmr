import { configureStore } from '@reduxjs/toolkit';
import langReducer from './interSlice';

export const store = configureStore({
    reducer: {
        lang: langReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;