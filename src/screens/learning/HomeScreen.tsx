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
import { fetchLearningInsights } from '../../store/slices/progressSlice';
import { getLanguageNativeName } from '../../utils/helpers';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const lessons = useSelector((state: RootState) => state.lessons.lessons);
  const insights = useSelector((state: RootState) => state.progress.insights);
  const isLoading = useSelector((state: RootState) => state.lessons.isLoading);

  useEffect(() => {
    if (currentUser?.selectedLanguage) {
      dispatch(fetchLessons(currentUser.selectedLanguage));
      dispatch(fetchLearningInsights(currentUser.id));
    }
  }, [dispatch, currentUser]);

  const handleStartLesson = (lessonId: string) => {
    navigation.navigate('Lesson', { lessonId });
  };

  const handleViewProgress = () => {
    navigation.navigate('Progress');
  };

  const handleViewLessons = () => {
    // Navigate to lessons tab
    // This would be handled by the tab navigator
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Namaste, {currentUser?.name || 'Learner'}! 🙏
          </Text>
          <Text style={styles.subtitle}>
            Ready to learn {getLanguageNativeName(currentUser?.selectedLanguage || 'hi-IN')}?
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {insights?.totalLessonsCompleted || 0}
            </Text>
            <Text style={styles.statLabel}>Lessons Completed</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {insights?.learningStreak || 0}
            </Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {insights?.averageScore || 0}%
            </Text>
            <Text style={styles.statLabel}>Average Score</Text>
          </View>
        </View>

        {/* Continue Learning */}
        {lessons.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <TouchableOpacity
              style={styles.continueCard}
              onPress={() => handleStartLesson(lessons[0].id)}
              activeOpacity={0.8}
            >
              <View style={styles.continueContent}>
                <Text style={styles.continueTitle}>{lessons[0].content.text}</Text>
                <Text style={styles.continueSubtitle}>
                  {lessons[0].content.translation}
                </Text>
                <Text style={styles.continueDescription}>
                  {lessons[0].type.charAt(0).toUpperCase() + lessons[0].type.slice(1)} • {lessons[0].estimatedTime} min
                </Text>
              </View>
              <View style={styles.continueIcon}>
                <Text style={styles.continueIconText}>▶️</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={handleViewLessons}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>📚</Text>
              <Text style={styles.actionTitle}>Browse Lessons</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={handleViewProgress}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionTitle}>View Progress</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Settings')}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>⚙️</Text>
              <Text style={styles.actionTitle}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Profile')}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>👤</Text>
              <Text style={styles.actionTitle}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Goal */}
        <View style={styles.section}>
          <View style={styles.goalCard}>
            <Text style={styles.goalTitle}>Daily Learning Goal</Text>
            <Text style={styles.goalTarget}>
              {currentUser?.preferences.dailyGoal || 30} minutes
            </Text>
            <View style={styles.goalProgress}>
              <View style={[styles.goalProgressBar, { width: '25%' }]} />
            </View>
            <Text style={styles.goalStatus}>
              7 minutes completed today
            </Text>
          </View>
        </View>

        {/* Loading State */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading your lessons...</Text>
          </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  greeting: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary.blue,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  continueCard: {
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 80,
    ...SHADOWS.md,
  },
  continueContent: {
    flex: 1,
  },
  continueTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary.blue,
    marginBottom: SPACING.xs,
    flexShrink: 1,
  },
  continueSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.primary.blue,
    marginBottom: SPACING.xs,
  },
  continueDescription: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
  },
  continueIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  continueIconText: {
    fontSize: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    alignItems: 'center',
    minHeight: 100,
    ...SHADOWS.sm,
    paddingHorizontal: SPACING.sm,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: SPACING.xs,
  },
  actionTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: TYPOGRAPHY.fontSize.base,
    marginTop: SPACING.xs,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeight.normal,
  },
  goalCard: {
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  goalTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  goalTarget: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary.blue,
    marginBottom: SPACING.md,
  },
  goalProgress: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: SPACING.sm,
  },
  goalProgressBar: {
    height: '100%',
    backgroundColor: COLORS.primary.green,
    borderRadius: 4,
    boxShadow: '0 2px 12px rgba(34,34,34,0.08)',
  },
  goalStatus: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
  },
  loadingContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
  },
});

export default HomeScreen; 