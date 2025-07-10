import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/constants';

const SettingsScreen: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Customize your learning experience
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Name</Text>
            <Text style={styles.settingValue}>{currentUser?.name}</Text>
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Language</Text>
            <Text style={styles.settingValue}>
              {currentUser?.selectedLanguage === 'hi-IN' ? 'हिंदी (Hindi)' : 
               currentUser?.selectedLanguage === 'ta-IN' ? 'தமிழ் (Tamil)' :
               currentUser?.selectedLanguage === 'mr-IN' ? 'मराठी (Marathi)' :
               currentUser?.selectedLanguage === 'bn-IN' ? 'বাংলা (Bengali)' : 'Hindi'}
            </Text>
          </View>
        </View>

        {/* Learning Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Preferences</Text>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Daily Goal</Text>
            <Text style={styles.settingValue}>
              {currentUser?.preferences.dailyGoal || 30} minutes
            </Text>
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Difficulty Level</Text>
            <Text style={styles.settingValue}>
              {currentUser?.preferences.difficulty?.charAt(0).toUpperCase() + 
               currentUser?.preferences.difficulty?.slice(1) || 'Beginner'}
            </Text>
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Audio Enabled</Text>
            <Text style={styles.settingValue}>
              {currentUser?.preferences.audioEnabled ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Auto Play</Text>
            <Text style={styles.settingValue}>
              {currentUser?.preferences.autoPlay ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Theme</Text>
            <Text style={styles.settingValue}>
              {currentUser?.preferences.theme?.charAt(0).toUpperCase() + 
               currentUser?.preferences.theme?.slice(1) || 'Light'}
            </Text>
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Text style={styles.settingValue}>
              {currentUser?.preferences.notifications ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Build</Text>
            <Text style={styles.settingValue}>2024.1.0</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Export Progress</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Clear Cache</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
            <Text style={[styles.actionButtonText, styles.dangerButtonText]}>
              Reset Progress
            </Text>
          </TouchableOpacity>
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
  settingCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  settingLabel: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.text.primary,
  },
  settingValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
  },
  actionButton: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  actionButtonText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.text.primary,
  },
  dangerButton: {
    backgroundColor: COLORS.error + '10',
    borderWidth: 1,
    borderColor: COLORS.error + '20',
  },
  dangerButtonText: {
    color: COLORS.error,
  },
});

export default SettingsScreen; 