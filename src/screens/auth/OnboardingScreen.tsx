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
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, GLASS } from '../../utils/constants';
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
    backgroundColor: COLORS.background.gradient, // Use gradient background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
    backgroundColor: COLORS.background.glass,
    ...SHADOWS.glass,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    width: '100%',
    maxWidth: 420,
  },
  appName: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: '700',
    color: COLORS.primary.purple,
    marginBottom: SPACING.md,
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    textShadowColor: COLORS.glassShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: '700',
    color: COLORS.primary.blue,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    letterSpacing: 1.2,
    textShadowColor: COLORS.glassShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.primary.purple,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeight.normal,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
  },
  inputContainer: {
    ...GLASS,
    ...SHADOWS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    width: '100%',
    maxWidth: 420,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600',
    color: COLORS.primary.blue,
    marginBottom: SPACING.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  textInput: {
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text.primary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  languageInfo: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  languageInfoTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.primary.purple,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  languageInfoText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.primary.blue,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  featuresContainer: {
    ...GLASS,
    ...SHADOWS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    width: '100%',
    maxWidth: 420,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  featuresTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.primary.purple,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  featureIcon: {
    fontSize: 28,
    marginRight: SPACING.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.primary.blue,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  startButton: {
    ...GLASS,
    ...SHADOWS.card,
    backgroundColor: COLORS.primary.purple,
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING['2xl'],
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  startButtonDisabled: {
    backgroundColor: COLORS.background.card,
    opacity: 0.6,
  },
  startButtonText: {
    color: COLORS.text.inverse,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  startButtonTextDisabled: {
    color: COLORS.text.secondary,
  },
});

export default OnboardingScreen; 