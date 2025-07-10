import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../utils/types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, GLASS } from '../../utils/constants';
import { fetchLessonById } from '../../store/slices/lessonSlice';
import * as Speech from 'expo-speech';
import { lessonsMockData } from '../../services/api/lessonsMockData';

// Types
type LessonScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Lesson'>;
type LessonScreenRouteProp = RouteProp<RootStackParamList, 'Lesson'>;

const LessonScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<LessonScreenNavigationProp>();
  const route = useRoute<LessonScreenRouteProp>();
  const { lessonId } = route.params;

  // Find the lesson in mock data
  const lesson = lessonsMockData.find(l => l.id === lessonId);
  const languageCode = lesson?.language === 'Hindi' ? 'hi-IN' : lesson?.language === 'Tamil' ? 'ta-IN' : 'en';

  const currentLesson = useSelector((state: RootState) => state.lessons.currentLesson);
  const isLoading = useSelector((state: RootState) => state.lessons.isLoading);
  const settings = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    dispatch(fetchLessonById(lessonId));
  }, [dispatch, lessonId]);

  const handlePlayAudio = () => {
    // Mock audio playback
    // You can integrate Expo AV here
    alert('Playing audio for: ' + currentLesson?.content.text);
  };

  const handlePlayCharacter = (char: string, langOverride?: string) => {
    if (!settings.audioEnabled) return;
    Speech.speak(char, {
      language: langOverride || languageCode,
      rate: settings.speechRate,
      pitch: settings.speechPitch,
    });
  };

  const handleNext = () => {
    // Navigate to Quiz for this lesson
    navigation.navigate('Quiz', { lessonId });
  };

  if (isLoading || !currentLesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading lesson...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      <View style={styles.inner}>
        {/* Characters Row */}
        {lesson?.characters && lesson.characters.length > 0 && (
          <View style={styles.charactersRow}>
            {lesson.characters.map((c, idx) => (
              <View key={c.char + idx} style={styles.characterCard}>
                <Text style={styles.characterBig}>{c.char}</Text>
                <Text style={styles.pronunciation}>{c.pronunciation}</Text>
                <TouchableOpacity style={styles.playButton} onPress={() => handlePlayCharacter(c.char)}>
                  <Text style={styles.playButtonText}>🔊</Text>
                </TouchableOpacity>
                {/* Show Hindi equivalent if not a Hindi lesson, hindiChar exists, and setting is enabled */}
                {lesson.language !== 'Hindi' && c.hindiChar && settings.showHindiEquivalents && (
                  <View style={styles.hindiCharBlock}>
                    <Text style={styles.hindiCharLabel}>Hindi:</Text>
                    <Text style={styles.characterBig}>{c.hindiChar}</Text>
                    <Text style={styles.pronunciation}>{c.hindiPronunciation}</Text>
                    <TouchableOpacity style={styles.playButton} onPress={() => handlePlayCharacter(c.hindiChar, 'hi-IN')}>
                      <Text style={styles.playButtonText}>🔊</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
        {/* Title */}
        <Text style={styles.title}>Learn {lesson?.language || 'Language'}</Text>
        {/* Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            {/* Badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>10</Text>
            </View>
            {/* Character */}
            <TouchableOpacity style={styles.characterTouchable} onPress={handlePlayAudio} activeOpacity={0.8}>
              <Text style={styles.character}>{currentLesson.content.text}</Text>
              <Text style={styles.tapToListen}>Tap to listen</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Take Quiz Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.nextButtonText}>Take Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.gradient, // Use gradient background
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: '700',
    color: COLORS.primary.purple,
    marginBottom: SPACING['2xl'],
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  card: {
    width: 260,
    height: 260,
    ...GLASS,
    ...SHADOWS.card,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backdropFilter: 'blur(16px)', // for web
  },
  badge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.primary.orange,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    zIndex: 2,
    minWidth: 32,
    alignItems: 'center',
    ...SHADOWS.glass,
  },
  badgeText: {
    color: COLORS.text.inverse,
    fontWeight: '700',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  characterTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  character: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    color: COLORS.primary.blue,
    fontWeight: '700',
    marginBottom: SPACING.md,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  tapToListen: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  nextButton: {
    marginTop: SPACING['2xl'],
    backgroundColor: COLORS.primary.purple,
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING['2xl'],
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    ...SHADOWS.glass,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backdropFilter: 'blur(8px)', // for web
  },
  nextButtonText: {
    color: COLORS.text.inverse,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text.secondary,
  },
  charactersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    gap: SPACING.lg,
  },
  characterCard: {
    alignItems: 'center',
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    ...SHADOWS.sm,
  },
  characterBig: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    color: COLORS.text.primary,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  pronunciation: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  playButton: {
    backgroundColor: COLORS.primary.blue,
    borderRadius: BORDER_RADIUS.full,
    padding: SPACING.sm,
    marginTop: SPACING.xs,
  },
  playButtonText: {
    color: COLORS.text.inverse,
    fontSize: 18,
    fontWeight: '700',
  },
  hindiCharBlock: {
    marginTop: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
  },
  hindiCharLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.primary.orange,
    fontWeight: '600',
    marginBottom: 2,
  },
});

export default LessonScreen; 