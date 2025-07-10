// App-wide constants and configuration

import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const isSmallScreen = screenWidth < 375;
export const isMediumScreen = screenWidth >= 375 && screenWidth < 414;
export const isLargeScreen = screenWidth >= 414;

export const getResponsiveSize = (small: number, medium: number, large: number) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

export const getResponsiveSpacing = (small: number, medium: number, large: number) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

export const getMobilePadding = () => isSmallScreen ? SPACING.sm : SPACING.md;
export const getMobileMargin = () => isSmallScreen ? SPACING.xs : SPACING.sm;
export const getMobileFontSize = (baseSize: number) => isSmallScreen ? baseSize - 2 : baseSize;

export const APP_CONFIG = {
  name: 'BharatShiksha',
  version: '1.0.0',
  description: 'Local Language Learning Companion for India',
};

export const COLORS = {
  background: {
    primary: 'rgba(245, 247, 250, 0.85)', // Glassy white
    card: 'rgba(255, 255, 255, 0.65)', // Glass card
    gradient: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)',
    glass: 'rgba(255,255,255,0.25)',
  },
  primary: {
    orange: '#FF7E5F', // Vibrant orange
    green: '#43E97B', // Neon green
    blue: '#3B6CB7', // Deep blue
    purple: '#7F53AC', // Accent purple
    pink: '#FF6A88', // Accent pink
  },
  accent: {
    neon: '#43E97B',
    blue: '#3B6CB7',
    purple: '#7F53AC',
    pink: '#FF6A88',
  },
  text: {
    primary: '#1A1A2E',
    secondary: '#555E7B',
    inverse: '#FFF',
    glass: 'rgba(26,26,46,0.7)',
  },
  border: 'rgba(255,255,255,0.35)',
  shadow: 'rgba(34, 34, 34, 0.10)',
  glassShadow: 'rgba(31, 38, 135, 0.15)',
};

export const GLASS = {
  backgroundColor: COLORS.background.glass,
  borderColor: COLORS.border,
  borderWidth: 1,
  borderRadius: 24,
  overflow: 'visible', // changed from 'hidden' to 'visible' for RN compatibility
  // For web: backdropFilter: 'blur(16px)',
  // For native: use expo-blur or similar
};

export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'Inter', // Suggest Inter or Poppins for modern look
    medium: 'Inter',
    bold: 'Inter',
  },
  fontSize: {
    xs: getResponsiveSize(12, 13, 14),
    sm: getResponsiveSize(14, 15, 16),
    base: getResponsiveSize(16, 17, 18),
    lg: getResponsiveSize(18, 19, 20),
    xl: getResponsiveSize(22, 24, 26),
    '2xl': getResponsiveSize(28, 30, 32),
    '3xl': getResponsiveSize(36, 38, 40),
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const BORDER_RADIUS = {
  sm: 12,
  md: 20,
  lg: 32,
  xl: 48,
  full: 9999,
};

export const SHADOWS = {
  card: {
    shadowColor: COLORS.glassShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 12,
  },
  glass: {
    shadowColor: COLORS.glassShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
  },
};

export const LANGUAGES = {
  hindi: {
    code: 'hi-IN',
    name: 'हिंदी',
    englishName: 'Hindi',
    script: 'Devanagari',
  },
  tamil: {
    code: 'ta-IN',
    name: 'தமிழ்',
    englishName: 'Tamil',
    script: 'Tamil',
  },
  marathi: {
    code: 'mr-IN',
    name: 'मराठी',
    englishName: 'Marathi',
    script: 'Devanagari',
  },
  bengali: {
    code: 'bn-IN',
    name: 'বাংলা',
    englishName: 'Bengali',
    script: 'Bengali',
  },
};

export const LESSON_TYPES = {
  alphabet: 'alphabet',
  number: 'number',
  word: 'word',
  sentence: 'sentence',
  story: 'story',
} as const;

export const QUIZ_TYPES = {
  multiple_choice: 'multiple_choice',
  drag_drop: 'drag_drop',
  audio_match: 'audio_match',
  fill_blank: 'fill_blank',
} as const;

export const DIFFICULTY_LEVELS = {
  beginner: 'beginner',
  intermediate: 'intermediate',
  advanced: 'advanced',
} as const;

export const STORAGE_KEYS = {
  USER_PROGRESS: 'user_progress',
  SELECTED_LANGUAGE: 'selected_language',
  USER_SETTINGS: 'user_settings',
  AUDIO_CACHE: 'audio_cache',
  LESSON_CACHE: 'lesson_cache',
};

export const API_ENDPOINTS = {
  AI4BHARAT_TTS: 'https://api.ai4bharat.org/tts',
  AI4BHARAT_STT: 'https://api.ai4bharat.org/asr',
  AI4BHARAT_TRANSLATE: 'https://api.ai4bharat.org/translation',
};

export const AUDIO_CONFIG = {
  defaultVolume: 1.0,
  playbackRate: 1.0,
  shouldPlay: true,
  shouldCorrectPitch: true,
  shouldVibrate: false,
};

export const ANIMATION_CONFIG = {
  duration: 300,
  easing: 'ease-in-out',
  springConfig: {
    tension: 100,
    friction: 8,
  },
}; 