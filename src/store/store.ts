// Redux store configuration for BharatShiksha

import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import lessonSlice from './slices/lessonSlice';
import progressSlice from './slices/progressSlice';
import audioSlice from './slices/audioSlice';
import quizSlice from './slices/quizSlice';
import settingsSlice from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    lessons: lessonSlice,
    progress: progressSlice,
    audio: audioSlice,
    quiz: quizSlice,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'payload.lastActiveDate'],
        // Ignore these paths in the state
        ignoredPaths: ['audio.cache'],
        // Increase warning threshold to reduce noise
        warnAfter: 128,
      },
    }),
  devTools: __DEV__,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 