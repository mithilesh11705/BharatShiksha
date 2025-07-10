// Mock lessons data for BharatShiksha
export const lessonsMockData = [
  {
    id: 'hindi-1',
    language: 'Hindi',
    title: 'परिचय (Introduction)',
    description: 'हिंदी भाषा का परिचय और मूल शब्दावली।',
    progress: 0,
    characters: [
      { char: 'अ', pronunciation: 'a' },
      { char: 'आ', pronunciation: 'aa' },
      { char: 'इ', pronunciation: 'i' },
    ],
    quiz: [
      {
        id: 'hindi-1-q1',
        type: 'multiple-choice',
        question: 'हिंदी किस देश की राजभाषा है?',
        options: ['भारत', 'नेपाल', 'श्रीलंका', 'पाकिस्तान'],
        correctOptionIndex: 0,
      },
      {
        id: 'hindi-1-q2',
        type: 'multiple-choice',
        question: '"नमस्ते" का अर्थ क्या है?',
        options: ['धन्यवाद', 'अलविदा', 'नमस्कार', 'शुभ रात्रि'],
        correctOptionIndex: 2,
      },
    ],
  },
  {
    id: 'hindi-2',
    language: 'Hindi',
    title: 'संज्ञा (Nouns)',
    description: 'संज्ञा के प्रकार और उदाहरण।',
    progress: 0,
    characters: [
      { char: 'क', pronunciation: 'ka' },
      { char: 'ख', pronunciation: 'kha' },
      { char: 'ग', pronunciation: 'ga' },
    ],
    quiz: [
      {
        id: 'hindi-2-q1',
        type: 'multiple-choice',
        question: 'संज्ञा किसे कहते हैं?',
        options: ['क्रिया', 'नाम', 'विशेषण', 'सर्वनाम'],
        correctOptionIndex: 1,
      },
      {
        id: 'hindi-2-q2',
        type: 'multiple-choice',
        question: 'इनमें से कौन-सा संज्ञा है?',
        options: ['खाना', 'लिखना', 'किताब', 'सोचना'],
        correctOptionIndex: 2,
      },
    ],
  },
  {
    id: 'tamil-1',
    language: 'Tamil',
    title: 'அறிமுகம் (Introduction)',
    description: 'தமிழ் மொழியின் அறிமுகம் மற்றும் அடிப்படை சொற்கள்.',
    progress: 0,
    characters: [
      { char: 'அ', pronunciation: 'a', hindiChar: 'अ', hindiPronunciation: 'a' },
      { char: 'ஆ', pronunciation: 'aa', hindiChar: 'आ', hindiPronunciation: 'aa' },
      { char: 'இ', pronunciation: 'i', hindiChar: 'इ', hindiPronunciation: 'i' },
    ],
    quiz: [
      {
        id: 'tamil-1-q1',
        type: 'multiple-choice',
        question: 'தமிழ் எந்த நாட்டின் மொழி?',
        options: ['இந்தியா', 'சீனா', 'மலேசியா', 'இங்கிலாந்து'],
        correctOptionIndex: 0,
      },
      {
        id: 'tamil-1-q2',
        type: 'multiple-choice',
        question: '"வணக்கம்" என்றால் என்ன?',
        options: ['நன்றி', 'வணக்கம்', 'பிரியா', 'இரவு'],
        correctOptionIndex: 1,
      },
    ],
  },
  {
    id: 'tamil-2',
    language: 'Tamil',
    title: 'பெயர்ச்சொல் (Nouns)',
    description: 'பெயர்ச்சொற்களின் வகைகள் மற்றும் எடுத்துக்காட்டுகள்.',
    progress: 0,
    characters: [
      { char: 'க', pronunciation: 'ka', hindiChar: 'क', hindiPronunciation: 'ka' },
      { char: 'ங', pronunciation: 'nga', hindiChar: 'ङ', hindiPronunciation: 'nga' },
      { char: 'ச', pronunciation: 'cha', hindiChar: 'च', hindiPronunciation: 'cha' },
    ],
    quiz: [
      {
        id: 'tamil-2-q1',
        type: 'multiple-choice',
        question: 'பெயர்ச்சொல் என்பது என்ன?',
        options: ['வினை', 'பெயர்', 'வினையெச்சம்', 'உருபு'],
        correctOptionIndex: 1,
      },
      {
        id: 'tamil-2-q2',
        type: 'multiple-choice',
        question: 'கீழ்கண்டவற்றில் எது பெயர்ச்சொல்?',
        options: ['ஓடு', 'படிக்க', 'மரம்', 'நட'],
        correctOptionIndex: 2,
      },
    ],
  },
]; 