import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Dimensions,
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

const BG_IMAGE = require('../../../assets/Onboard.png');

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

  const isMobile = Dimensions.get('window').width < 400;

  // For reference-style layout, only show the language buttons, no extra text
  return (
    <ImageBackground source={BG_IMAGE} style={styles.bgImage} resizeMode="cover">
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <View style={styles.glassCard}>
          {!isMobile && <Text style={styles.projectName}>BharatShiksha</Text>}
          {!isMobile && <Text style={styles.title}>Select Language</Text>}
          <Text style={styles.subtitle}>Welcome to BharatShiksha!{"\n"}Please select your preferred language to get started.</Text>
          <View style={[styles.buttonRow, isMobile && styles.buttonRowMobile]}>
            {Object.entries(LANGUAGES).map(([key, language], idx) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.languageButton,
                  isMobile && styles.languageButtonMobile,
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
                <Text style={[styles.languageText, isMobile && styles.languageTextMobile]}>{language.name}</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  inner: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
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
  buttonRowMobile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
    gap: SPACING.sm,
  },
  languageButton: {
    minWidth: 80,
    minHeight: 44,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
    marginVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    ...SHADOWS.card,
    shadowColor: COLORS.shadow,
  },
  languageButtonMobile: {
    minWidth: 80,
    minHeight: 44,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.xs,
    marginVertical: SPACING.xs,
  },
  languageText: {
    color: COLORS.text.inverse,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  languageTextMobile: {
    fontSize: TYPOGRAPHY.fontSize.base,
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
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.55)',
    zIndex: 1,
  },
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING['2xl'],
    marginHorizontal: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.card,
    zIndex: 2,
  },
  projectName: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: '700',
    color: COLORS.primary.purple,
    marginBottom: SPACING.lg,
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    textShadowColor: COLORS.glassShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
});

export default LanguageSelectScreen; 