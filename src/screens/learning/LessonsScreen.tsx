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
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/constants';
import { fetchLessons } from '../../store/slices/lessonSlice';
import { getLessonTypeText, getDifficultyText, getDifficultyColor } from '../../utils/helpers';

type LessonsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const LessonsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<LessonsScreenNavigationProp>();
  
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const lessons = useSelector((state: RootState) => state.lessons.lessons);
  const isLoading = useSelector((state: RootState) => state.lessons.isLoading);

  useEffect(() => {
    if (currentUser?.selectedLanguage) {
      dispatch(fetchLessons(currentUser.selectedLanguage));
    }
  }, [dispatch, currentUser]);

  const handleLessonPress = (lessonId: string) => {
    navigation.navigate('Lesson', { lessonId });
  };

  const groupedLessons = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.type]) {
      acc[lesson.type] = [];
    }
    acc[lesson.type].push(lesson);
    return acc;
  }, {} as Record<string, typeof lessons>);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Lessons</Text>
        <Text style={styles.subtitle}>
          Master {currentUser?.selectedLanguage === 'hi-IN' ? 'Hindi' : 'your language'} step by step
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading lessons...</Text>
          </View>
        ) : (
          Object.entries(groupedLessons).map(([type, typeLessons]) => (
            <View key={type} style={styles.section}>
              <Text style={styles.sectionTitle}>{getLessonTypeText(type)}</Text>
              {typeLessons.map((lesson) => (
                <TouchableOpacity
                  key={lesson.id}
                  style={styles.lessonCard}
                  onPress={() => handleLessonPress(lesson.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.lessonContent}>
                    <Text style={styles.lessonText}>{lesson.content.text}</Text>
                    <Text style={styles.lessonTranslation}>
                      {lesson.content.translation}
                    </Text>
                    <View style={styles.lessonMeta}>
                      <View style={[
                        styles.difficultyBadge,
                        { backgroundColor: getDifficultyColor(lesson.difficulty) }
                      ]}>
                        <Text style={styles.difficultyText}>
                          {getDifficultyText(lesson.difficulty)}
                        </Text>
                      </View>
                      <Text style={styles.lessonDuration}>
                        {lesson.estimatedTime} min
                      </Text>
                    </View>
                  </View>
                  <View style={styles.lessonArrow}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
  },
  scrollView: {
    flex: 1,
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
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  lessonContent: {
    flex: 1,
  },
  lessonText: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  lessonTranslation: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.primary.blue,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
});

export default LessonsScreen; 