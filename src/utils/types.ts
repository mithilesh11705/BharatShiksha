// TypeScript types and interfaces for BharatShiksha

import { LESSON_TYPES, QUIZ_TYPES, DIFFICULTY_LEVELS } from './constants';

// Language Types
export type LanguageCode = 'hi-IN' | 'ta-IN' | 'mr-IN' | 'bn-IN';
export type LanguageKey = 'hindi' | 'tamil' | 'marathi' | 'bengali';

export interface Language {
  code: LanguageCode;
  name: string;
  englishName: string;
  script: string;
}

// Lesson Types
export type LessonType = typeof LESSON_TYPES[keyof typeof LESSON_TYPES];
export type DifficultyLevel = typeof DIFFICULTY_LEVELS[keyof typeof DIFFICULTY_LEVELS];

export interface LessonContent {
  text: string;
  audio: string;
  image?: string;
  translation?: string;
  pronunciation?: string;
}

export interface Lesson {
  id: string;
  type: LessonType;
  language: LanguageCode;
  content: LessonContent;
  difficulty: DifficultyLevel;
  prerequisites: string[];
  estimatedTime: number; // in minutes
  tags: string[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

// Quiz Types
export type QuizType = typeof QUIZ_TYPES[keyof typeof QUIZ_TYPES];

export interface QuizOption {
  id: string;
  text: string;
  audio?: string;
  image?: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  audio?: string;
  image?: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation?: string;
  timeLimit?: number; // in seconds
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage
  timeLimit?: number; // total time in minutes
  difficulty: DifficultyLevel;
  createdAt: string; // ISO string
}

// User Types
export interface User {
  id: string;
  name: string;
  selectedLanguage: LanguageCode;
  preferences: UserPreferences;
  createdAt: string; // ISO string
  lastActiveAt: string; // ISO string
}

export interface UserPreferences {
  audioEnabled: boolean;
  autoPlay: boolean;
  difficulty: DifficultyLevel;
  dailyGoal: number; // minutes
  notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
}

// Progress Types
export interface UserProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number; // 0-100
  timeSpent: number; // in seconds
  mistakes: string[];
  completedAt?: string; // ISO string
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number; // 0-100
  timeTaken: number; // in seconds
  answers: QuizAnswer[];
  passed: boolean;
  createdAt: string; // ISO string
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

// Learning Analytics Types
export interface LearningInsights {
  userId: string;
  totalLessonsCompleted: number;
  totalTimeSpent: number; // in minutes
  averageScore: number;
  strengths: string[];
  weaknesses: string[];
  learningStreak: number; // consecutive days
  lastActiveDate: string; // ISO string
  recommendedLessons: string[];
  estimatedCompletionTime: number; // in days
}

export interface UserProfile {
  userId: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic';
  preferredPace: 'slow' | 'medium' | 'fast';
  strengths: string[];
  weaknesses: string[];
  completedLessons: string[];
  averageScore: number;
  timeSpent: number;
  lastActiveAt: string; // ISO string
}

// Audio Types
export interface AudioFile {
  id: string;
  text: string;
  language: LanguageCode;
  filePath: string;
  duration: number; // in seconds
  fileSize: number; // in bytes
  createdAt: string; // ISO string
}

export interface AudioCache {
  [key: string]: AudioFile;
}

// Navigation Types
export type RootStackParamList = {
  LanguageSelect: undefined;
  Onboarding: undefined;
  Main: undefined;
  Lesson: { lessonId: string };
  Quiz: { quizId: string };
  Progress: undefined;
  Settings: undefined;
  Profile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Lessons: undefined;
  Progress: undefined;
  Settings: undefined;
};

// API Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AI4BharatTTSRequest {
  text: string;
  language: LanguageCode;
  voice?: string;
  speed?: number;
}

export interface AI4BharatTTSResponse {
  audio: string; // base64 encoded audio
  duration: number;
  wordCount: number;
}

export interface AI4BharatSTTRequest {
  audio: string; // base64 encoded audio
  language: LanguageCode;
}

export interface AI4BharatSTTResponse {
  text: string;
  confidence: number;
  duration: number;
}

// Database Types
export interface DatabaseSchema {
  users: User;
  lessons: Lesson;
  quizzes: Quiz;
  userProgress: UserProgress;
  quizAttempts: QuizAttempt;
  audioFiles: AudioFile;
}

// Component Props Types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
}

export interface AudioPlayerProps {
  audioFile: AudioFile;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  autoPlay?: boolean;
  showControls?: boolean;
}

export interface LessonCardProps {
  lesson: Lesson;
  onPress: () => void;
  progress?: UserProgress;
  showProgress?: boolean;
}

export interface QuizCardProps {
  quiz: Quiz;
  onPress: () => void;
  completed?: boolean;
  score?: number;
}

export interface ProgressBarProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  color?: string;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string; // ISO string
}

// Settings Types
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: LanguageCode;
  audioEnabled: boolean;
  notifications: boolean;
  autoPlay: boolean;
  dailyGoal: number;
  dataUsage: 'low' | 'medium' | 'high';
}

// Cache Types
export interface CacheConfig {
  maxSize: number; // in MB
  maxAge: number; // in days
  enableCompression: boolean;
}

export interface CacheItem<T> {
  key: string;
  value: T;
  timestamp: string; // ISO string
  size: number;
  accessCount: number;
} 