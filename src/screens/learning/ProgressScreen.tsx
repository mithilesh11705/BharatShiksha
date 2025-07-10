import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/constants';

const ProgressScreen: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const insights = useSelector((state: RootState) => state.progress.insights);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Learning Progress</Text>
        <Text style={styles.subtitle}>
          Track your journey in {currentUser?.selectedLanguage === 'hi-IN' ? 'Hindi' : 'your language'}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
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

        {/* Time Spent */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time Spent Learning</Text>
          <View style={styles.timeCard}>
            <Text style={styles.timeNumber}>
              {Math.round((insights?.totalTimeSpent || 0) / 60)}h
            </Text>
            <Text style={styles.timeLabel}>Total Learning Time</Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>🏆</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>First Steps</Text>
              <Text style={styles.achievementDescription}>
                Complete your first lesson
              </Text>
            </View>
            <Text style={styles.achievementStatus}>✓</Text>
          </View>
          
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>🔥</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>On Fire</Text>
              <Text style={styles.achievementDescription}>
                Maintain a 7-day learning streak
              </Text>
            </View>
            <Text style={styles.achievementStatus}>...</Text>
          </View>
        </View>

        {/* Learning Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Goals</Text>
          <View style={styles.goalCard}>
            <Text style={styles.goalTitle}>Daily Goal</Text>
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
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
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  timeCard: {
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeNumber: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary.blue,
    marginBottom: SPACING.sm,
  },
  timeLabel: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
  },
  achievementCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  achievementDescription: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
  },
  achievementStatus: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.success,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  goalCard: {
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  goalTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  goalTarget: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
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
    backgroundColor: COLORS.primary.blue,
    borderRadius: 4,
  },
  goalStatus: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
  },
});

export default ProgressScreen; 