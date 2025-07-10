import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';
import { LANGUAGES, COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/constants';
import { updateUserLanguage } from '../../store/slices/userSlice';

const languageButtonColors = [
  COLORS.primary.orange,
  COLORS.primary.green,
  COLORS.primary.blue,
  '#BDBDBD', // fallback for more languages
];

type LanguageSelectScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LanguageSelect'>;

const LanguageSelectScreen: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<string | null>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation<LanguageSelectScreenNavigationProp>();

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleContinue = async () => {
    if (selectedLanguage) {
      try {
        await dispatch(updateUserLanguage(selectedLanguage as any)).unwrap();
        // Navigation will happen automatically
      } catch (error) {
        console.error('Failed to update language:', error);
      }
    }
  };

  // For reference-style layout, only show the language buttons, no extra text
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      <View style={styles.inner}>
        <Text style={styles.title}>Select Language</Text>
        <Text style={styles.subtitle}>Welcome to BharatShiksha!{"\n"}Please select your preferred language to get started.</Text>
        <View style={styles.buttonRow}>
          {Object.entries(LANGUAGES).map(([key, language], idx) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.languageButton,
                {
                  backgroundColor:
                    idx === 0
                      ? COLORS.primary.orange
                      : idx === 1
                      ? COLORS.primary.green
                      : idx === 2
                      ? COLORS.primary.blue
                      : languageButtonColors[idx] || COLORS.primary.blue,
                  borderColor: selectedLanguage === language.code ? COLORS.text.primary : 'transparent',
                  borderWidth: selectedLanguage === language.code ? 2 : 0,
                },
              ]}
              onPress={() => handleLanguageSelect(language.code)}
              activeOpacity={0.85}
            >
              <Text style={styles.languageText}>{language.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedLanguage && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedLanguage}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: SPACING['2xl'],
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: { fontSize: TYPOGRAPHY.fontSize.base, color: COLORS.text.secondary, textAlign: 'center', marginBottom: SPACING.xl },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
    flexWrap: 'wrap',
    gap: SPACING.lg,
  },
  languageButton: {
    minWidth: 120,
    minHeight: 60,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
    marginVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    ...SHADOWS.card,
    shadowColor: COLORS.shadow,
  },
  languageText: {
    color: COLORS.text.inverse,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  continueButton: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary.blue,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING['2xl'],
    alignItems: 'center',
    ...SHADOWS.card,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  continueButtonText: {
    color: COLORS.text.inverse,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default LanguageSelectScreen; 