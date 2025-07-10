import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../utils/types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, GLASS } from '../../utils/constants';
import { fetchLessons } from '../../store/slices/lessonSlice';
import { getLessonTypeText, getDifficultyText, getDifficultyColor } from '../../utils/helpers';
import { lessonsMockData } from '../../services/api/lessonsMockData';

type LessonsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const LessonsScreen: React.FC = () => {
  // const dispatch = useDispatch();
  const navigation = useNavigation<LessonsScreenNavigationProp>();
  
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  // const lessons = useSelector((state: RootState) => state.lessons.lessons);
  // const isLoading = useSelector((state: RootState) => state.lessons.isLoading);

  // useEffect(() => {
  //   if (currentUser?.selectedLanguage) {
  //     dispatch(fetchLessons(currentUser.selectedLanguage));
  //   }
  // }, [dispatch, currentUser]);

  // Determine selected language as string (e.g., 'Hindi', 'Tamil')
  const selectedLanguage = currentUser?.selectedLanguage === 'hi-IN' ? 'Hindi' : currentUser?.selectedLanguage === 'ta-IN' ? 'Tamil' : undefined;

  // Filter lessons by selected language
  const lessons = lessonsMockData.filter(lesson => lesson.language === selectedLanguage);

  const handleLessonPress = (lessonId: string) => {
    navigation.navigate('Lesson', { lessonId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      <View style={styles.header}>
        <Text style={styles.title}>Lessons</Text>
        <Text style={styles.subtitle}>
          Master {selectedLanguage || 'your language'} step by step
        </Text>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {lessons.length === 0 ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>No lessons found for this language.</Text>
          </View>
        ) : (
          lessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.lessonCard}
              onPress={() => handleLessonPress(lesson.id)}
              activeOpacity={0.8}
            >
              <View style={styles.lessonContent}>
                <Text style={styles.lessonText}>{lesson.title}</Text>
                <Text style={styles.lessonTranslation}>{lesson.description}</Text>
              </View>
              <View style={styles.lessonArrow}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.gradient, // Use gradient background
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 0,
    // Glassy header
    backgroundColor: COLORS.background.glass,
    ...SHADOWS.glass,
    borderRadius: BORDER_RADIUS.xl,
    margin: SPACING.md,
    alignItems: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary.purple,
    marginBottom: SPACING.xs,
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.glass,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginBottom: SPACING.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  loadingContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  lessonCard: {
    ...GLASS,
    ...SHADOWS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 90,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backdropFilter: 'blur(16px)', // for web
  },
  lessonContent: {
    flex: 1,
  },
  lessonText: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary.blue,
    marginBottom: SPACING.xs,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    letterSpacing: 0.2,
  },
  lessonTranslation: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.sm,
  },
  difficultyText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.text.inverse,
  },
  lessonDuration: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
  },
  lessonArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary.purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.md,
    ...SHADOWS.glass,
  },
  arrowText: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.text.inverse,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
});

export default LessonsScreen; 