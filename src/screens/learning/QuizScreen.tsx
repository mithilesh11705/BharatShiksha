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
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/constants';
import { lessonsMockData } from '../../services/api/lessonsMockData';
import { RootStackParamList } from '../../utils/types';

const QuizScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Quiz'>>();
  const { lessonId } = route.params || {};

  // Find the lesson and its quiz
  const lesson = lessonsMockData.find(l => l.id === lessonId);
  const quiz = lesson?.quiz || [];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.cardPrompt}>Quiz not found.</Text>
      </SafeAreaView>
    );
  }

  const currentQ = quiz[current];

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setAnswered(true);
    if (idx === currentQ.correctOptionIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current < quiz.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowSummary(true);
    }
  };

  if (showSummary) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
            <Text style={styles.headerIconText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{lesson.title} Quiz</Text>
          <View style={styles.headerIcon} />
        </View>
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardPrompt}>Quiz Complete!</Text>
            <Text style={styles.cardPrompt}>Score: {score} / {quiz.length}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.goBack()}>
          <Text style={styles.optionText}>Back to Lessons</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Text style={styles.headerIconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{lesson.title} Quiz</Text>
        <View style={styles.headerIcon} />
      </View>
      {/* Card */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Text style={styles.cardPrompt}>{currentQ.question}</Text>
        </View>
      </View>
      {/* Options */}
      <View style={styles.optionsWrapper}>
        {currentQ.options.map((option, idx) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selected === idx && (idx === currentQ.correctOptionIndex
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
        {answered && (
          <TouchableOpacity style={styles.optionButton} onPress={handleNext}>
            <Text style={styles.optionText}>{current < quiz.length - 1 ? 'Next' : 'Finish'}</Text>
          </TouchableOpacity>
        )}
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