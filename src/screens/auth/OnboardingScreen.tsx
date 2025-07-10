import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../utils/types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/constants';
import { initializeUser } from '../../store/slices/userSlice';
import { validateName } from '../../utils/helpers';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const selectedLanguage = useSelector((state: RootState) => state.user.currentUser?.selectedLanguage);

  const handleStartLearning = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!validateName(name)) {
      Alert.alert('Error', 'Name must be between 2 and 50 characters');
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(initializeUser(name.trim())).unwrap();
      // Navigation will be handled automatically by the AppNavigator
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isStartDisabled = !name.trim() || isLoading;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>BharatShiksha</Text>
          <Text style={styles.title}>Welcome to BharatShiksha!</Text>
          <Text style={styles.subtitle}>
            Let's personalize your learning experience
          </Text>
        </View>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>What's your name?</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={COLORS.text.secondary}
            autoFocus
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={50}
          />
        </View>

        {/* Language Info */}
        <View style={styles.languageInfo}>
          <Text style={styles.languageInfoTitle}>Selected Language:</Text>
          <Text style={styles.languageInfoText}>
            {selectedLanguage === 'hi-IN' ? 'हिंदी (Hindi)' : 
             selectedLanguage === 'ta-IN' ? 'தமிழ் (Tamil)' :
             selectedLanguage === 'mr-IN' ? 'मराठी (Marathi)' :
             selectedLanguage === 'bn-IN' ? 'বাংলা (Bengali)' : 'Hindi'}
          </Text>
        </View>

        {/* Features Preview */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What you'll learn:</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔤</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Alphabets & Numbers</Text>
              <Text style={styles.featureDescription}>
                Master the basic building blocks of the language
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📝</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Words & Sentences</Text>
              <Text style={styles.featureDescription}>
                Learn common words and form simple sentences
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎧</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Audio Learning</Text>
              <Text style={styles.featureDescription}>
                Listen and practice pronunciation with native audio
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🧠</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Smart Quizzes</Text>
              <Text style={styles.featureDescription}>
                Test your knowledge with interactive quizzes
              </Text>
            </View>
          </View>
        </View>

        {/* Start Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.startButton,
              isStartDisabled && styles.startButtonDisabled,
            ]}
            onPress={handleStartLearning}
            disabled={isStartDisabled}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.startButtonText,
              isStartDisabled && styles.startButtonTextDisabled,
            ]}>
              {isLoading ? 'Setting up...' : 'Start Learning'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  appName: { fontSize: TYPOGRAPHY.fontSize['2xl'], fontWeight: '700', color: COLORS.primary.blue, marginBottom: SPACING.md, letterSpacing: 1, textAlign: 'center' },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: '700',
    color: COLORS.primary.blue,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeight.normal,
  },
  inputContainer: {
    marginBottom: SPACING.xl,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  textInput: {
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text.primary,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  languageInfo: {
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  languageInfoTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '500',
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  languageInfoText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600',
    color: COLORS.primary.blue,
  },
  featuresContainer: {
    flex: 1,
  },
  featuresTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  featureDescription: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
  },
  buttonContainer: {
    marginTop: SPACING.xl,
  },
  startButton: {
    backgroundColor: COLORS.primary.blue,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  startButtonDisabled: {
    backgroundColor: COLORS.border,
    ...SHADOWS.card,
  },
  startButtonText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600',
    color: COLORS.text.inverse,
  },
  startButtonTextDisabled: {
    color: COLORS.text.secondary,
  },
});

export default OnboardingScreen; 