// Progress slice for managing user learning progress and analytics

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserProgress, QuizAttempt, LearningInsights, UserProfile } from '../../utils/types';
import { generateId, calculateAverageScore, calculateTotalTimeSpent, getLearningStreak } from '../../utils/helpers';

// Async thunks
export const saveLessonProgress = createAsyncThunk(
  'progress/saveLessonProgress',
  async (progress: Omit<UserProgress, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newProgress: UserProgress = {
      ...progress,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return newProgress;
  }
);

export const saveQuizAttempt = createAsyncThunk(
  'progress/saveQuizAttempt',
  async (attempt: Omit<QuizAttempt, 'id' | 'createdAt'>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    return newAttempt;
  }
);

export const fetchUserProgress = createAsyncThunk(
  'progress/fetchUserProgress',
  async (userId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data for now
    return [] as UserProgress[];
  }
);

export const fetchLearningInsights = createAsyncThunk(
  'progress/fetchLearningInsights',
  async (userId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock insights
    const insights: LearningInsights = {
      userId,
      totalLessonsCompleted: 0,
      totalTimeSpent: 0,
      averageScore: 0,
      strengths: [],
      weaknesses: [],
      learningStreak: 0,
      lastActiveDate: new Date().toISOString(),
      recommendedLessons: [],
      estimatedCompletionTime: 30,
    };
    
    return insights;
  }
);

// State interface
interface ProgressState {
  lessonProgress: UserProgress[];
  quizAttempts: QuizAttempt[];
  insights: LearningInsights | null;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProgressState = {
  lessonProgress: [],
  quizAttempts: [],
  insights: null,
  isLoading: false,
  error: null,
};

// Progress slice
const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    // Update lesson progress
    updateLessonProgress: (state, action: PayloadAction<UserProgress>) => {
      const index = state.lessonProgress.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.lessonProgress[index] = action.payload;
      } else {
        state.lessonProgress.push(action.payload);
      }
    },
    
    // Mark lesson as completed
    completeLesson: (state, action: PayloadAction<{ lessonId: string; userId: string; score: number; timeSpent: number }>) => {
      const { lessonId, userId, score, timeSpent } = action.payload;
      
      const existingProgress = state.lessonProgress.find(
        p => p.lessonId === lessonId && p.userId === userId
      );
      
      if (existingProgress) {
        existingProgress.completed = true;
        existingProgress.score = score;
        existingProgress.timeSpent = timeSpent;
        existingProgress.completedAt = new Date().toISOString();
        existingProgress.updatedAt = new Date().toISOString();
      } else {
        const newProgress: UserProgress = {
          id: generateId(),
          userId,
          lessonId,
          completed: true,
          score,
          timeSpent,
          mistakes: [],
          completedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        state.lessonProgress.push(newProgress);
      }
    },
    
    // Add quiz attempt
    addQuizAttempt: (state, action: PayloadAction<QuizAttempt>) => {
      state.quizAttempts.push(action.payload);
    },
    
    // Update insights
    updateInsights: (state, action: PayloadAction<LearningInsights>) => {
      state.insights = action.payload;
    },
    
    // Clear progress
    clearProgress: (state) => {
      state.lessonProgress = [];
      state.quizAttempts = [];
      state.insights = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save lesson progress
      .addCase(saveLessonProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveLessonProgress.fulfilled, (state, action) => {
        state.lessonProgress.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(saveLessonProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to save progress';
      })
      
      // Save quiz attempt
      .addCase(saveQuizAttempt.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveQuizAttempt.fulfilled, (state, action) => {
        state.quizAttempts.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(saveQuizAttempt.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to save quiz attempt';
      })
      
      // Fetch user progress
      .addCase(fetchUserProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.lessonProgress = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch progress';
      })
      
      // Fetch learning insights
      .addCase(fetchLearningInsights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLearningInsights.fulfilled, (state, action) => {
        state.insights = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchLearningInsights.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch insights';
      });
  },
});

// Export actions
export const {
  updateLessonProgress,
  completeLesson,
  addQuizAttempt,
  updateInsights,
  clearProgress,
  clearError,
} = progressSlice.actions;

// Export selectors
export const selectLessonProgress = (state: { progress: ProgressState }) => state.progress.lessonProgress;
export const selectQuizAttempts = (state: { progress: ProgressState }) => state.progress.quizAttempts;
export const selectInsights = (state: { progress: ProgressState }) => state.progress.insights;
export const selectIsProgressLoading = (state: { progress: ProgressState }) => state.progress.isLoading;
export const selectProgressError = (state: { progress: ProgressState }) => state.progress.error;

// Computed selectors
export const selectCompletedLessons = (state: { progress: ProgressState }, userId: string) =>
  state.progress.lessonProgress.filter(p => p.userId === userId && p.completed);

export const selectCompletedLessonIds = (state: { progress: ProgressState }, userId: string) =>
  state.progress.lessonProgress
    .filter(p => p.userId === userId && p.completed)
    .map(p => p.lessonId);

export const selectUserAverageScore = (state: { progress: ProgressState }, userId: string) => {
  const userProgress = state.progress.lessonProgress.filter(p => p.userId === userId);
  return calculateAverageScore(userProgress);
};

export const selectUserTotalTimeSpent = (state: { progress: ProgressState }, userId: string) => {
  const userProgress = state.progress.lessonProgress.filter(p => p.userId === userId);
  return calculateTotalTimeSpent(userProgress);
};

export const selectUserLearningStreak = (state: { progress: ProgressState }, userId: string) => {
  const userProgress = state.progress.lessonProgress.filter(p => p.userId === userId);
  return getLearningStreak(userProgress);
};

export const selectLessonProgressById = (state: { progress: ProgressState }, lessonId: string, userId: string) =>
  state.progress.lessonProgress.find(p => p.lessonId === lessonId && p.userId === userId);

// Export reducer
export default progressSlice.reducer; 