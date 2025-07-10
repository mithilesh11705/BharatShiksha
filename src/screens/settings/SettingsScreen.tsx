import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setShowHindiEquivalents, setSpeechRate, setSpeechPitch, setAudioEnabled } from '../../store/slices/settingsSlice';
import { updateUserLanguage } from '../../store/slices/userSlice';
import { Picker } from '@react-native-picker/picker';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/constants';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
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
            <View style={{ flex: 1 }}>
              <Picker
                selectedValue={currentUser?.selectedLanguage}
                onValueChange={v => dispatch(updateUserLanguage(v))}
                style={{ width: '100%' }}
                itemStyle={{ fontSize: 16 }}
              >
                <Picker.Item label="हिंदी (Hindi)" value="hi-IN" />
                <Picker.Item label="தமிழ் (Tamil)" value="ta-IN" />
                <Picker.Item label="मराठी (Marathi)" value="mr-IN" />
                <Picker.Item label="বাংলা (Bengali)" value="bn-IN" />
              </Picker>
            </View>
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

        {/* BharatShiksha Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BharatShiksha Settings</Text>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Show Hindi Equivalents</Text>
            <Switch
              value={settings.showHindiEquivalents}
              onValueChange={v => dispatch(setShowHindiEquivalents(v))}
            />
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Audio Enabled</Text>
            <Switch
              value={settings.audioEnabled}
              onValueChange={v => dispatch(setAudioEnabled(v))}
            />
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Speech Rate</Text>
            <Slider
              style={{ width: 120 }}
              minimumValue={0.5}
              maximumValue={1.5}
              step={0.05}
              value={settings.speechRate}
              onValueChange={v => dispatch(setSpeechRate(v))}
            />
            <Text style={styles.settingValue}>{settings.speechRate.toFixed(2)}</Text>
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Speech Pitch</Text>
            <Slider
              style={{ width: 120 }}
              minimumValue={0.5}
              maximumValue={2.0}
              step={0.05}
              value={settings.speechPitch}
              onValueChange={v => dispatch(setSpeechPitch(v))}
            />
            <Text style={styles.settingValue}>{settings.speechPitch.toFixed(2)}</Text>
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
    backgroundColor: COLORS.background.gradient, // Use gradient background
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
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: '700',
    color: COLORS.primary.blue,
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
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '700',
    color: COLORS.primary.purple,
    marginBottom: SPACING.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    letterSpacing: 0.2,
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