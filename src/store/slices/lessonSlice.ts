// Lesson slice for managing lesson data and operations

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Lesson, LanguageCode, LessonType, DifficultyLevel } from '../../utils/types';
import { generateId } from '../../utils/helpers';

// Mock lesson data - In a real app, this would come from an API
const mockLessons: Lesson[] = [
  // Hindi Alphabet Lessons
  {
    id: 'hindi-ka',
    type: 'alphabet',
    language: 'hi-IN',
    content: {
      text: 'क',
      audio: 'ka.mp3',
      image: 'ka.png',
      translation: 'Ka',
      pronunciation: 'ka',
    },
    difficulty: 'beginner',
    prerequisites: [],
    estimatedTime: 2,
    tags: ['alphabet', 'hindi', 'beginner'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'hindi-kha',
    type: 'alphabet',
    language: 'hi-IN',
    content: {
      text: 'ख',
      audio: 'kha.mp3',
      image: 'kha.png',
      translation: 'Kha',
      pronunciation: 'kha',
    },
    difficulty: 'beginner',
    prerequisites: ['hindi-ka'],
    estimatedTime: 2,
    tags: ['alphabet', 'hindi', 'beginner'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'hindi-ga',
    type: 'alphabet',
    language: 'hi-IN',
    content: {
      text: 'ग',
      audio: 'ga.mp3',
      image: 'ga.png',
      translation: 'Ga',
      pronunciation: 'ga',
    },
    difficulty: 'beginner',
    prerequisites: ['hindi-kha'],
    estimatedTime: 2,
    tags: ['alphabet', 'hindi', 'beginner'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // Hindi Number Lessons
  {
    id: 'hindi-1',
    type: 'number',
    language: 'hi-IN',
    content: {
      text: '१',
      audio: 'ek.mp3',
      image: '1.png',
      translation: 'One',
      pronunciation: 'ek',
    },
    difficulty: 'beginner',
    prerequisites: [],
    estimatedTime: 2,
    tags: ['number', 'hindi', 'beginner'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'hindi-2',
    type: 'number',
    language: 'hi-IN',
    content: {
      text: '२',
      audio: 'do.mp3',
      image: '2.png',
      translation: 'Two',
      pronunciation: 'do',
    },
    difficulty: 'beginner',
    prerequisites: ['hindi-1'],
    estimatedTime: 2,
    tags: ['number', 'hindi', 'beginner'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // Hindi Word Lessons
  {
    id: 'hindi-apple',
    type: 'word',
    language: 'hi-IN',
    content: {
      text: 'सेब',
      audio: 'seb.mp3',
      image: 'apple.png',
      translation: 'Apple',
      pronunciation: 'seb',
    },
    difficulty: 'beginner',
    prerequisites: ['hindi-ka', 'hindi-1'],
    estimatedTime: 3,
    tags: ['word', 'hindi', 'beginner', 'fruit'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // Tamil Alphabet Lessons
  {
    id: 'tamil-ka',
    type: 'alphabet',
    language: 'ta-IN',
    content: {
      text: 'க',
      audio: 'ka.mp3',
      image: 'ka.png',
      translation: 'Ka',
      pronunciation: 'ka',
    },
    difficulty: 'beginner',
    prerequisites: [],
    estimatedTime: 2,
    tags: ['alphabet', 'tamil', 'beginner'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tamil-nga',
    type: 'alphabet',
    language: 'ta-IN',
    content: {
      text: 'ங',
      audio: 'nga.mp3',
      image: 'nga.png',
      translation: 'Nga',
      pronunciation: 'nga',
    },
    difficulty: 'beginner',
    prerequisites: ['tamil-ka'],
    estimatedTime: 2,
    tags: ['alphabet', 'tamil', 'beginner'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Async thunks
export const fetchLessons = createAsyncThunk(
  'lessons/fetchLessons',
  async (language: LanguageCode) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter lessons by language
    const lessons = mockLessons.filter(lesson => lesson.language === language);
    return lessons;
  }
);

export const fetchLessonById = createAsyncThunk(
  'lessons/fetchLessonById',
  async (lessonId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const lesson = mockLessons.find(l => l.id === lessonId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    
    return lesson;
  }
);

export const fetchLessonsByType = createAsyncThunk(
  'lessons/fetchLessonsByType',
  async ({ language, type }: { language: LanguageCode; type: LessonType }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lessons = mockLessons.filter(
      lesson => lesson.language === language && lesson.type === type
    );
    return lessons;
  }
);

export const fetchLessonsByDifficulty = createAsyncThunk(
  'lessons/fetchLessonsByDifficulty',
  async ({ language, difficulty }: { language: LanguageCode; difficulty: DifficultyLevel }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lessons = mockLessons.filter(
      lesson => lesson.language === language && lesson.difficulty === difficulty
    );
    return lessons;
  }
);

// State interface
interface LessonState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    language: LanguageCode | null;
    type: LessonType | null;
    difficulty: DifficultyLevel | null;
  };
}

// Initial state
const initialState: LessonState = {
  lessons: [],
  currentLesson: null,
  isLoading: false,
  error: null,
  filters: {
    language: null,
    type: null,
    difficulty: null,
  },
};

// Lesson slice
const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    // Set current lesson
    setCurrentLesson: (state, action: PayloadAction<Lesson | null>) => {
      state.currentLesson = action.payload;
    },
    
    // Set filters
    setLanguageFilter: (state, action: PayloadAction<LanguageCode>) => {
      state.filters.language = action.payload;
    },
    
    setTypeFilter: (state, action: PayloadAction<LessonType>) => {
      state.filters.type = action.payload;
    },
    
    setDifficultyFilter: (state, action: PayloadAction<DifficultyLevel>) => {
      state.filters.difficulty = action.payload;
    },
    
    // Clear filters
    clearFilters: (state) => {
      state.filters = {
        language: null,
        type: null,
        difficulty: null,
      };
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Add lesson (for admin functionality)
    addLesson: (state, action: PayloadAction<Lesson>) => {
      state.lessons.push(action.payload);
    },
    
    // Update lesson
    updateLesson: (state, action: PayloadAction<Lesson>) => {
      const index = state.lessons.findIndex(l => l.id === action.payload.id);
      if (index !== -1) {
        state.lessons[index] = action.payload;
      }
    },
    
    // Remove lesson
    removeLesson: (state, action: PayloadAction<string>) => {
      state.lessons = state.lessons.filter(l => l.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch lessons
      .addCase(fetchLessons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.lessons = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch lessons';
      })
      
      // Fetch lesson by ID
      .addCase(fetchLessonById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.currentLesson = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch lesson';
      })
      
      // Fetch lessons by type
      .addCase(fetchLessonsByType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLessonsByType.fulfilled, (state, action) => {
        state.lessons = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchLessonsByType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch lessons by type';
      })
      
      // Fetch lessons by difficulty
      .addCase(fetchLessonsByDifficulty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLessonsByDifficulty.fulfilled, (state, action) => {
        state.lessons = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchLessonsByDifficulty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch lessons by difficulty';
      });
  },
});

// Export actions
export const {
  setCurrentLesson,
  setLanguageFilter,
  setTypeFilter,
  setDifficultyFilter,
  clearFilters,
  clearError,
  addLesson,
  updateLesson,
  removeLesson,
} = lessonSlice.actions;

// Export selectors
export const selectLessons = (state: { lessons: LessonState }) => state.lessons.lessons;
export const selectCurrentLesson = (state: { lessons: LessonState }) => state.lessons.currentLesson;
export const selectIsLessonsLoading = (state: { lessons: LessonState }) => state.lessons.isLoading;
export const selectLessonsError = (state: { lessons: LessonState }) => state.lessons.error;
export const selectLessonFilters = (state: { lessons: LessonState }) => state.lessons.filters;

// Filtered selectors
export const selectLessonsByLanguage = (state: { lessons: LessonState }, language: LanguageCode) =>
  state.lessons.lessons.filter(lesson => lesson.language === language);

export const selectLessonsByType = (state: { lessons: LessonState }, type: LessonType) =>
  state.lessons.lessons.filter(lesson => lesson.type === type);

export const selectLessonsByDifficulty = (state: { lessons: LessonState }, difficulty: DifficultyLevel) =>
  state.lessons.lessons.filter(lesson => lesson.difficulty === difficulty);

export const selectAvailableLessons = (state: { lessons: LessonState }, completedLessonIds: string[]) =>
  state.lessons.lessons.filter(lesson => 
    lesson.prerequisites.every(prereq => completedLessonIds.includes(prereq))
  );

// Export reducer
export default lessonSlice.reducer; 