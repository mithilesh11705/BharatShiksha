import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../utils/types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, GLASS } from '../../utils/constants';
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

  const isMobile = Dimensions.get('window').width < 400;

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
          
          <View style={[styles.actionsGrid, isMobile && styles.actionsGridMobile]}>
            <TouchableOpacity
              style={[styles.actionCard, isMobile && styles.actionCardMobile]}
              onPress={handleViewLessons}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>📚</Text>
              <Text style={styles.actionTitle}>Browse Lessons</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionCard, isMobile && styles.actionCardMobile]}
              onPress={handleViewProgress}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionTitle}>View Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionCard, isMobile && styles.actionCardMobile]}
              onPress={() => navigation.navigate('Settings')}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>⚙️</Text>
              <Text style={styles.actionTitle}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionCard, isMobile && styles.actionCardMobile]}
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
    backgroundColor: COLORS.background.gradient, // Use gradient background
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING['2xl'], // add bottom padding for mobile
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.background.glass,
    ...SHADOWS.glass,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  greeting: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: '700',
    color: COLORS.primary.blue,
    marginBottom: SPACING.xs,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    letterSpacing: 1.2,
    textShadowColor: COLORS.glassShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.primary.purple,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginBottom: SPACING.sm,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  statCard: {
    ...GLASS,
    ...SHADOWS.card,
    borderRadius: BORDER_RADIUS.lg,
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    marginHorizontal: SPACING.xs,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backdropFilter: 'blur(12px)',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    color: COLORS.primary.blue,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  section: {
    marginBottom: SPACING['2xl'],
    paddingBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '700',
    color: COLORS.primary.purple,
    marginBottom: SPACING.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    letterSpacing: 0.2,
  },
  continueCard: {
    ...GLASS,
    ...SHADOWS.card,
    borderRadius: BORDER_RADIUS.xl,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.xl,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
    backdropFilter: 'blur(16px)',
  },
  continueContent: {
    flex: 1,
  },
  continueTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.primary.blue,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: SPACING.xs,
  },
  continueSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginBottom: SPACING.sm,
  },
  continueDescription: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.glass,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  continueIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary.purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.md,
    ...SHADOWS.glass,
  },
  continueIconText: {
    fontSize: 28,
    color: COLORS.text.inverse,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
    gap: SPACING.lg,
  },
  actionsGridMobile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
    gap: SPACING.lg,
  },
  actionCard: {
    ...GLASS,
    ...SHADOWS.card,
    borderRadius: BORDER_RADIUS.lg,
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    paddingVertical: SPACING['2xl'],
    marginBottom: SPACING.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.sm,
    opacity: 0.96,
    maxWidth: '100%',
  },
  actionCardMobile: {
    width: '48%',
    minWidth: 140,
    marginHorizontal: SPACING.sm,
    marginBottom: SPACING.lg,
    paddingVertical: SPACING['2xl'],
    flexBasis: '48%',
    flexGrow: 1,
    maxWidth: '48%',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  actionTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.primary.purple,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  goalCard: {
    ...GLASS,
    ...SHADOWS.card,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    padding: SPACING.xl,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: SPACING['2xl'], // bring up from bottom
    backdropFilter: 'blur(12px)',
  },
  goalTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.primary.blue,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: SPACING.xs,
  },
  goalTarget: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.primary.purple,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: SPACING.sm,
  },
  goalProgress: {
    width: '100%',
    height: 10,
    backgroundColor: COLORS.background.card,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  goalProgressBar: {
    height: '100%',
    backgroundColor: COLORS.primary.green,
    borderRadius: 8,
  },
  goalStatus: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
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