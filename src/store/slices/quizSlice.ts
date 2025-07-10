// Quiz slice for managing quiz data and attempts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Quiz, QuizAttempt, QuizQuestion, QuizAnswer } from '../../utils/types';
import { generateId, shuffleArray } from '../../utils/helpers';

// Mock quiz data
const mockQuizzes: Quiz[] = [
  {
    id: 'hindi-alphabet-quiz-1',
    lessonId: 'hindi-ka',
    title: 'Hindi Alphabet Quiz 1',
    description: 'Test your knowledge of Hindi alphabets',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'Which letter makes the "ka" sound?',
        audio: 'ka.mp3',
        options: [
          { id: 'opt1', text: 'क', isCorrect: true },
          { id: 'opt2', text: 'ख', isCorrect: false },
          { id: 'opt3', text: 'ग', isCorrect: false },
          { id: 'opt4', text: 'घ', isCorrect: false },
        ],
        correctAnswer: 'opt1',
        explanation: 'क (ka) is the first letter of the Hindi alphabet',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: 'Which letter makes the "kha" sound?',
        audio: 'kha.mp3',
        options: [
          { id: 'opt1', text: 'क', isCorrect: false },
          { id: 'opt2', text: 'ख', isCorrect: true },
          { id: 'opt3', text: 'ग', isCorrect: false },
          { id: 'opt4', text: 'घ', isCorrect: false },
        ],
        correctAnswer: 'opt2',
        explanation: 'ख (kha) is the second letter of the Hindi alphabet',
      },
    ],
    passingScore: 70,
    timeLimit: 5, // 5 minutes
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'hindi-numbers-quiz-1',
    lessonId: 'hindi-1',
    title: 'Hindi Numbers Quiz 1',
    description: 'Test your knowledge of Hindi numbers',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'What is the Hindi word for "One"?',
        audio: 'ek.mp3',
        options: [
          { id: 'opt1', text: 'एक', isCorrect: true },
          { id: 'opt2', text: 'दो', isCorrect: false },
          { id: 'opt3', text: 'तीन', isCorrect: false },
          { id: 'opt4', text: 'चार', isCorrect: false },
        ],
        correctAnswer: 'opt1',
        explanation: 'एक (ek) means "one" in Hindi',
      },
    ],
    passingScore: 70,
    timeLimit: 3,
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
  },
];

// Async thunks
export const fetchQuizzes = createAsyncThunk(
  'quiz/fetchQuizzes',
  async (lessonId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const quizzes = mockQuizzes.filter(quiz => quiz.lessonId === lessonId);
    return quizzes;
  }
);

export const fetchQuizById = createAsyncThunk(
  'quiz/fetchQuizById',
  async (quizId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const quiz = mockQuizzes.find(q => q.id === quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    
    return quiz;
  }
);

export const submitQuizAttempt = createAsyncThunk(
  'quiz/submitQuizAttempt',
  async (attempt: Omit<QuizAttempt, 'id' | 'createdAt'>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    return newAttempt;
  }
);

// State interface
interface QuizState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentAttempt: QuizAttempt | null;
  isLoading: boolean;
  error: string | null;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  timeRemaining: number;
  isQuizActive: boolean;
}

// Initial state
const initialState: QuizState = {
  quizzes: [],
  currentQuiz: null,
  currentAttempt: null,
  isLoading: false,
  error: null,
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: 0,
  isQuizActive: false,
};

// Quiz slice
const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    // Set current quiz
    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.currentQuiz = action.payload;
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.timeRemaining = action.payload?.timeLimit ? action.payload.timeLimit * 60 : 0;
      state.isQuizActive = false;
    },
    
    // Start quiz
    startQuiz: (state) => {
      if (state.currentQuiz) {
        state.isQuizActive = true;
        state.currentQuestionIndex = 0;
        state.answers = {};
        state.timeRemaining = state.currentQuiz.timeLimit ? state.currentQuiz.timeLimit * 60 : 0;
      }
    },
    
    // Answer question
    answerQuestion: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    
    // Next question
    nextQuestion: (state) => {
      if (state.currentQuiz && state.currentQuestionIndex < state.currentQuiz.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    
    // Previous question
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    
    // Go to question
    goToQuestion: (state, action: PayloadAction<number>) => {
      if (state.currentQuiz && action.payload >= 0 && action.payload < state.currentQuiz.questions.length) {
        state.currentQuestionIndex = action.payload;
      }
    },
    
    // Update time remaining
    updateTimeRemaining: (state, action: PayloadAction<number>) => {
      state.timeRemaining = Math.max(0, action.payload);
    },
    
    // Finish quiz
    finishQuiz: (state) => {
      state.isQuizActive = false;
    },
    
    // Reset quiz
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.timeRemaining = state.currentQuiz?.timeLimit ? state.currentQuiz.timeLimit * 60 : 0;
      state.isQuizActive = false;
      state.currentAttempt = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch quizzes
      .addCase(fetchQuizzes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.quizzes = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch quizzes';
      })
      
      // Fetch quiz by ID
      .addCase(fetchQuizById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.currentQuiz = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch quiz';
      })
      
      // Submit quiz attempt
      .addCase(submitQuizAttempt.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitQuizAttempt.fulfilled, (state, action) => {
        state.currentAttempt = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(submitQuizAttempt.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to submit quiz';
      });
  },
});

// Export actions
export const {
  setCurrentQuiz,
  startQuiz,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  updateTimeRemaining,
  finishQuiz,
  resetQuiz,
  clearError,
} = quizSlice.actions;

// Export selectors
export const selectQuizzes = (state: { quiz: QuizState }) => state.quiz.quizzes;
export const selectCurrentQuiz = (state: { quiz: QuizState }) => state.quiz.currentQuiz;
export const selectCurrentAttempt = (state: { quiz: QuizState }) => state.quiz.currentAttempt;
export const selectIsQuizLoading = (state: { quiz: QuizState }) => state.quiz.isLoading;
export const selectQuizError = (state: { quiz: QuizState }) => state.quiz.error;
export const selectCurrentQuestionIndex = (state: { quiz: QuizState }) => state.quiz.currentQuestionIndex;
export const selectAnswers = (state: { quiz: QuizState }) => state.quiz.answers;
export const selectTimeRemaining = (state: { quiz: QuizState }) => state.quiz.timeRemaining;
export const selectIsQuizActive = (state: { quiz: QuizState }) => state.quiz.isQuizActive;

// Computed selectors
export const selectCurrentQuestion = (state: { quiz: QuizState }) => {
  const quiz = state.quiz.currentQuiz;
  const index = state.quiz.currentQuestionIndex;
  return quiz ? quiz.questions[index] : null;
};

export const selectQuizProgress = (state: { quiz: QuizState }) => {
  const quiz = state.quiz.currentQuiz;
  if (!quiz) return 0;
  return Math.round((state.quiz.currentQuestionIndex / quiz.questions.length) * 100);
};

export const selectAnsweredQuestions = (state: { quiz: QuizState }) => {
  return Object.keys(state.quiz.answers).length;
};

export const selectIsQuizComplete = (state: { quiz: QuizState }) => {
  const quiz = state.quiz.currentQuiz;
  if (!quiz) return false;
  return state.quiz.currentQuestionIndex >= quiz.questions.length - 1;
};

export const selectQuizScore = (state: { quiz: QuizState }) => {
  const quiz = state.quiz.currentQuiz;
  const answers = state.quiz.answers;
  
  if (!quiz) return 0;
  
  let correct = 0;
  quiz.questions.forEach(question => {
    const userAnswer = answers[question.id];
    if (userAnswer === question.correctAnswer) {
      correct++;
    }
  });
  
  return Math.round((correct / quiz.questions.length) * 100);
};

export const selectIsQuizPassed = (state: { quiz: QuizState }) => {
  const quiz = state.quiz.currentQuiz;
  const score = selectQuizScore(state);
  return quiz ? score >= quiz.passingScore : false;
};

// Export reducer
export default quizSlice.reducer; 