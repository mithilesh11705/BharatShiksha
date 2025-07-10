import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  showHindiEquivalents: boolean;
  speechRate: number;
  speechPitch: number;
  audioEnabled: boolean;
}

const initialState: SettingsState = {
  showHindiEquivalents: true,
  speechRate: 1.0,
  speechPitch: 1.0,
  audioEnabled: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setShowHindiEquivalents(state, action: PayloadAction<boolean>) {
      state.showHindiEquivalents = action.payload;
    },
    setSpeechRate(state, action: PayloadAction<number>) {
      state.speechRate = action.payload;
    },
    setSpeechPitch(state, action: PayloadAction<number>) {
      state.speechPitch = action.payload;
    },
    setAudioEnabled(state, action: PayloadAction<boolean>) {
      state.audioEnabled = action.payload;
    },
  },
});

export const {
  setShowHindiEquivalents,
  setSpeechRate,
  setSpeechPitch,
  setAudioEnabled,
} = settingsSlice.actions;

export default settingsSlice.reducer; 