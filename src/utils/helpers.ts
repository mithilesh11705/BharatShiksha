// Helper functions for BharatShiksha

import { LanguageCode, UserProgress, QuizAttempt, Lesson, Quiz } from './types';
import { LANGUAGES, DIFFICULTY_LEVELS } from './constants';

// Language Helpers
export const getLanguageName = (code: LanguageCode): string => {
  const language = Object.values(LANGUAGES).find(lang => lang.code === code);
  return language?.englishName || code;
};

export const getLanguageNativeName = (code: LanguageCode): string => {
  const language = Object.values(LANGUAGES).find(lang => lang.code === code);
  return language?.name || code;
};

export const isValidLanguageCode = (code: string): code is LanguageCode => {
  return Object.values(LANGUAGES).some(lang => lang.code === code);
};

// Time Formatting Helpers
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  return `${minutes}m ${remainingSeconds}s`;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return 'Today';
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

// Score and Progress Helpers
export const calculateScore = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const getScoreColor = (score: number): string => {
  if (score >= 90) return '#4CAF50'; // Green
  if (score >= 70) return '#FF9800'; // Orange
  return '#F44336'; // Red
};

export const getScoreText = (score: number): string => {
  if (score >= 90) return 'Excellent!';
  if (score >= 70) return 'Good!';
  if (score >= 50) return 'Fair';
  return 'Needs Improvement';
};

export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Learning Analytics Helpers
export const calculateAverageScore = (progresses: UserProgress[]): number => {
  if (progresses.length === 0) return 0;
  
  const totalScore = progresses.reduce((sum, progress) => sum + progress.score, 0);
  return Math.round(totalScore / progresses.length);
};

export const calculateTotalTimeSpent = (progresses: UserProgress[]): number => {
  return progresses.reduce((total, progress) => total + progress.timeSpent, 0);
};

export const getLearningStreak = (progresses: UserProgress[]): number => {
  if (progresses.length === 0) return 0;
  
  const sortedProgresses = progresses
    .filter(p => p.completed)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());
  
  let streak = 0;
  let currentDate = new Date();
  
  for (const progress of sortedProgresses) {
    const progressDate = new Date(progress.completedAt!);
    const diffInDays = Math.floor((currentDate.getTime() - progressDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays <= 1) {
      streak++;
      currentDate = progressDate;
    } else {
      break;
    }
  }
  
  return streak;
};

// Validation Helpers
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

// Array and Object Helpers
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const groupBy = <T, K extends keyof any>(array: T[], key: (item: T) => K): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = key(item);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

// Storage Helpers
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const sanitizeFileName = (fileName: string): string => {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
};

// Audio Helpers
export const formatAudioDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Difficulty Helpers
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case DIFFICULTY_LEVELS.beginner:
      return '#4CAF50'; // Green
    case DIFFICULTY_LEVELS.intermediate:
      return '#FF9800'; // Orange
    case DIFFICULTY_LEVELS.advanced:
      return '#F44336'; // Red
    default:
      return '#9E9E9E'; // Gray
  }
};

export const getDifficultyText = (difficulty: string): string => {
  switch (difficulty) {
    case DIFFICULTY_LEVELS.beginner:
      return 'Beginner';
    case DIFFICULTY_LEVELS.intermediate:
      return 'Intermediate';
    case DIFFICULTY_LEVELS.advanced:
      return 'Advanced';
    default:
      return 'Unknown';
  }
};

// Lesson and Quiz Helpers
export const getLessonTypeText = (type: string): string => {
  switch (type) {
    case 'alphabet':
      return 'Alphabet';
    case 'number':
      return 'Numbers';
    case 'word':
      return 'Words';
    case 'sentence':
      return 'Sentences';
    case 'story':
      return 'Stories';
    default:
      return 'Lesson';
  }
};

export const getQuizTypeText = (type: string): string => {
  switch (type) {
    case 'multiple_choice':
      return 'Multiple Choice';
    case 'drag_drop':
      return 'Drag & Drop';
    case 'audio_match':
      return 'Audio Match';
    case 'fill_blank':
      return 'Fill in the Blank';
    default:
      return 'Quiz';
  }
};

// Error Handling Helpers
export const createError = (code: string, message: string, details?: any) => {
  return {
    code,
    message,
    details,
    timestamp: new Date(),
  };
};

export const isNetworkError = (error: any): boolean => {
  return error?.message?.includes('Network') || error?.code === 'NETWORK_ERROR';
};

// Performance Helpers
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Accessibility Helpers
export const getAccessibilityLabel = (text: string, language: LanguageCode): string => {
  return `${text} in ${getLanguageName(language)}`;
};

export const getAccessibilityHint = (action: string): string => {
  return `Double tap to ${action}`;
}; 