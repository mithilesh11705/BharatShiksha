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
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/constants';
import { fetchLessonById } from '../../store/slices/lessonSlice';

// Types
type LessonScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Lesson'>;
type LessonScreenRouteProp = RouteProp<RootStackParamList, 'Lesson'>;

const LessonScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<LessonScreenNavigationProp>();
  const route = useRoute<LessonScreenRouteProp>();
  const { lessonId } = route.params;

  const currentLesson = useSelector((state: RootState) => state.lessons.currentLesson);
  const isLoading = useSelector((state: RootState) => state.lessons.isLoading);

  useEffect(() => {
    dispatch(fetchLessonById(lessonId));
  }, [dispatch, lessonId]);

  const handlePlayAudio = () => {
    // Mock audio playback
    // You can integrate Expo AV here
    alert('Playing audio for: ' + currentLesson?.content.text);
  };

  const handleNext = () => {
    // Navigate to Quiz or next lesson
    navigation.navigate('Quiz', { quizId: 'mock-quiz-id' });
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
        {/* Title */}
        <Text style={styles.title}>Learn Hindi</Text>

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

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
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
    color: COLORS.text.primary,
    marginBottom: SPACING['2xl'],
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  card: {
    width: 220,
    height: 220,
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...SHADOWS.card,
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
  },
  badgeText: {
    color: COLORS.text.inverse,
    fontWeight: '700',
    fontSize: TYPOGRAPHY.fontSize.sm,
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
    color: COLORS.text.primary,
    fontWeight: '700',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  tapToListen: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: SPACING['2xl'],
    backgroundColor: COLORS.primary.blue,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING['2xl'],
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    ...SHADOWS.card,
  },
  nextButtonText: {
    color: COLORS.text.inverse,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600',
    letterSpacing: 0.5,
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
});

export default LessonScreen; 