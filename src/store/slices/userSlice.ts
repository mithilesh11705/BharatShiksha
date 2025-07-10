// User slice for managing user state and preferences

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserPreferences, LanguageCode } from '../../utils/types';
import { generateId } from '../../utils/helpers';

// Async thunks
export const initializeUser = createAsyncThunk(
  'user/initialize',
  async (name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: generateId(),
      name,
      selectedLanguage: 'hi-IN',
      preferences: {
        audioEnabled: true,
        autoPlay: true,
        difficulty: 'beginner',
        dailyGoal: 30,
        notifications: true,
        theme: 'light',
      },
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    
    return user;
  }
);

export const updateUserLanguage = createAsyncThunk(
  'user/updateLanguage',
  async (language: LanguageCode) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return language;
  }
);

export const updateUserPreferences = createAsyncThunk(
  'user/updatePreferences',
  async (preferences: Partial<UserPreferences>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return preferences;
  }
);

// State interface
interface UserState {
  currentUser: User | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  currentUser: null,
  isInitialized: false,
  isLoading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Clear user data
    clearUser: (state) => {
      state.currentUser = null;
      state.isInitialized = false;
      state.error = null;
    },
    
    // Update last active time
    updateLastActive: (state) => {
      if (state.currentUser) {
        state.currentUser.lastActiveAt = new Date().toISOString();
      }
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
      // Initialize user
      .addCase(initializeUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isInitialized = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(initializeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to initialize user';
      })
      
      // Update language
      .addCase(updateUserLanguage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserLanguage.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.selectedLanguage = action.payload;
        } else {
          // Create a new user if none exists
          state.currentUser = {
            id: generateId(),
            name: 'User',
            selectedLanguage: action.payload,
            preferences: {
              audioEnabled: true,
              autoPlay: true,
              difficulty: 'beginner',
              dailyGoal: 30,
              notifications: true,
              theme: 'light',
            },
            createdAt: new Date().toISOString(),
            lastActiveAt: new Date().toISOString(),
          };
        }
        state.isInitialized = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserLanguage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update language';
      })
      
      // Update preferences
      .addCase(updateUserPreferences.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.preferences = {
            ...state.currentUser.preferences,
            ...action.payload,
          };
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserPreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update preferences';
      });
  },
});

// Export actions
export const { clearUser, updateLastActive, setError, clearError } = userSlice.actions;

// Export selectors
export const selectUser = (state: { user: UserState }) => state.user.currentUser;
export const selectIsUserInitialized = (state: { user: UserState }) => state.user.isInitialized;
export const selectIsUserLoading = (state: { user: UserState }) => state.user.isLoading;
export const selectUserError = (state: { user: UserState }) => state.user.error;
export const selectUserLanguage = (state: { user: UserState }) => state.user.currentUser?.selectedLanguage;
export const selectUserPreferences = (state: { user: UserState }) => state.user.currentUser?.preferences;

// Export reducer
export default userSlice.reducer; 