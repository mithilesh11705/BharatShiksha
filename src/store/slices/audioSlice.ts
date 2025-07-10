// Audio slice for managing audio playback and caching

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AudioFile, AudioCache } from '../../utils/types';
import { generateId } from '../../utils/helpers';

// Async thunks
export const loadAudio = createAsyncThunk(
  'audio/loadAudio',
  async ({ text, language }: { text: string; language: string }) => {
    // Simulate audio loading
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const audioFile: AudioFile = {
      id: generateId(),
      text,
      language: language as any,
      filePath: `${language}/${text}.mp3`,
      duration: 2.5,
      fileSize: 1024 * 50, // 50KB
      createdAt: new Date().toISOString(),
    };
    
    return audioFile;
  }
);

// State interface
interface AudioState {
  currentAudio: AudioFile | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  cache: AudioCache;
  volume: number;
  playbackRate: number;
}

// Initial state
const initialState: AudioState = {
  currentAudio: null,
  isPlaying: false,
  isLoading: false,
  error: null,
  cache: {},
  volume: 1.0,
  playbackRate: 1.0,
};

// Audio slice
const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    // Set current audio
    setCurrentAudio: (state, action: PayloadAction<AudioFile | null>) => {
      state.currentAudio = action.payload;
    },
    
    // Play audio
    playAudio: (state) => {
      state.isPlaying = true;
    },
    
    // Pause audio
    pauseAudio: (state) => {
      state.isPlaying = false;
    },
    
    // Stop audio
    stopAudio: (state) => {
      state.isPlaying = false;
      state.currentAudio = null;
    },
    
    // Set volume
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = Math.max(0, Math.min(1, action.payload));
    },
    
    // Set playback rate
    setPlaybackRate: (state, action: PayloadAction<number>) => {
      state.playbackRate = Math.max(0.5, Math.min(2, action.payload));
    },
    
    // Add to cache
    addToCache: (state, action: PayloadAction<AudioFile>) => {
      const key = `${action.payload.language}_${action.payload.text}`;
      state.cache[key] = action.payload;
    },
    
    // Remove from cache
    removeFromCache: (state, action: PayloadAction<string>) => {
      delete state.cache[action.payload];
    },
    
    // Clear cache
    clearCache: (state) => {
      state.cache = {};
    },
    
    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load audio
      .addCase(loadAudio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadAudio.fulfilled, (state, action) => {
        state.currentAudio = action.payload;
        state.isLoading = false;
        state.error = null;
        
        // Add to cache
        const key = `${action.payload.language}_${action.payload.text}`;
        state.cache[key] = action.payload;
      })
      .addCase(loadAudio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load audio';
      });
  },
});

// Export actions
export const {
  setCurrentAudio,
  playAudio,
  pauseAudio,
  stopAudio,
  setVolume,
  setPlaybackRate,
  addToCache,
  removeFromCache,
  clearCache,
  setError,
  clearError,
} = audioSlice.actions;

// Export selectors
export const selectCurrentAudio = (state: { audio: AudioState }) => state.audio.currentAudio;
export const selectIsPlaying = (state: { audio: AudioState }) => state.audio.isPlaying;
export const selectIsAudioLoading = (state: { audio: AudioState }) => state.audio.isLoading;
export const selectAudioError = (state: { audio: AudioState }) => state.audio.error;
export const selectAudioCache = (state: { audio: AudioState }) => state.audio.cache;
export const selectVolume = (state: { audio: AudioState }) => state.audio.volume;
export const selectPlaybackRate = (state: { audio: AudioState }) => state.audio.playbackRate;

// Cache selectors
export const selectAudioFromCache = (state: { audio: AudioState }, key: string) =>
  state.audio.cache[key];

export const selectIsAudioCached = (state: { audio: AudioState }, key: string) =>
  !!state.audio.cache[key];

// Export reducer
export default audioSlice.reducer; 