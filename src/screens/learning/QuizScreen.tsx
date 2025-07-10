import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/constants';

const mockQuestion = {
  image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg', // placeholder banana
  prompt: 'Select the word for "केला"',
  options: ['अक्क्षी', 'हे', 'के', 'केला'],
  correct: 3,
};

const QuizScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setAnswered(true);
    // In a real app, show feedback and go to next question
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Text style={styles.headerIconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hindi Quiz</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Text style={styles.headerIconText}>★</Text>
        </TouchableOpacity>
      </View>
      {/* Card */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Image
            source={{ uri: mockQuestion.image }}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardPrompt}>{mockQuestion.prompt}</Text>
        </View>
      </View>
      {/* Options */}
      <View style={styles.optionsWrapper}>
        {mockQuestion.options.map((option, idx) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selected === idx && (idx === mockQuestion.correct
                ? styles.optionButtonCorrect
                : styles.optionButtonWrong),
            ]}
            onPress={() => handleSelect(idx)}
            activeOpacity={0.85}
            disabled={answered}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconText: {
    fontSize: 22,
    color: COLORS.text.primary,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '700',
    color: COLORS.text.primary,
    textAlign: 'center',
    flex: 1,
  },
  cardWrapper: {
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  card: {
    width: 260,
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    padding: SPACING.lg,
    ...SHADOWS.card,
  },
  cardImage: {
    width: 120,
    height: 80,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background.primary,
  },
  cardPrompt: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  optionButton: {
    width: '90%',
    minHeight: 56,
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.card,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonCorrect: {
    borderColor: COLORS.primary.green,
    backgroundColor: '#E8F6EF',
  },
  optionButtonWrong: {
    borderColor: COLORS.primary.orange,
    backgroundColor: '#FFF2ED',
  },
  optionText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default QuizScreen; 