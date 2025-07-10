# BharatShiksha - Local Language Learning Companion

A comprehensive mobile application designed to help users learn Indian regional languages through interactive lessons, audio pronunciation, and AI-powered features.

## 🌟 Features

- **Multi-language Support**: Hindi, Tamil, Marathi, Bengali
- **Interactive Lessons**: Alphabet, numbers, words, and sentences
- **Audio Learning**: Native pronunciation with audio playback
- **Progress Tracking**: Detailed analytics and learning insights
- **Smart Recommendations**: AI-powered lesson suggestions
- **Offline Support**: Learn without internet connectivity
- **Gamified Learning**: Achievements and learning streaks

## 🚀 Tech Stack

- **Frontend**: React Native with Expo
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **Audio**: Expo AV
- **Storage**: AsyncStorage & SQLite
- **Language**: TypeScript
- **UI**: Custom design system with consistent theming

## 📱 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd BharatShiksha
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   - **Web**: Press `w` in the terminal or visit the URL shown
   - **iOS**: Press `i` in the terminal (requires iOS Simulator)
   - **Android**: Press `a` in the terminal (requires Android Studio)
   - **Physical Device**: Scan the QR code with Expo Go app

## 🏗️ Project Structure

```
BharatShiksha/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Generic components
│   │   ├── audio/          # Audio-related components
│   │   └── learning/       # Learning-specific components
│   ├── screens/            # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── learning/       # Learning screens
│   │   └── settings/       # Settings screens
│   ├── navigation/         # Navigation configuration
│   ├── store/              # Redux store and slices
│   │   └── slices/         # Redux slices
│   ├── services/           # API and external services
│   │   ├── api/            # API services
│   │   ├── database/       # Database services
│   │   └── audio/          # Audio services
│   └── utils/              # Utility functions and constants
├── assets/                 # Static assets
│   ├── audio/              # Audio files
│   └── images/             # Image files
└── App.tsx                 # Main app component
```

## 🎯 Core Features

### 1. Language Selection

- Choose from Hindi, Tamil, Marathi, or Bengali
- Native script support with proper typography
- Cultural context and regional variations

### 2. Interactive Lessons

- **Alphabet Lessons**: Learn basic characters and sounds
- **Number Lessons**: Master counting in the target language
- **Word Lessons**: Build vocabulary with common words
- **Sentence Lessons**: Form basic sentences and phrases

### 3. Audio Integration

- Native speaker pronunciation
- Audio playback controls
- Practice with listen-and-repeat exercises
- Offline audio caching

### 4. Progress Analytics

- Learning streak tracking
- Time spent learning
- Average scores and performance
- Achievement system
- Personalized recommendations

### 5. AI Features (Coming Soon)

- Smart content recommendations
- Adaptive difficulty adjustment
- Speech recognition for pronunciation
- Personalized learning paths

## 🔧 Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Follow the established design system
- Write meaningful component and function names

### State Management

The app uses Redux Toolkit for state management with the following slices:

- **userSlice**: User authentication and preferences
- **lessonSlice**: Lesson data and filtering
- **progressSlice**: Learning progress and analytics
- **audioSlice**: Audio playback and caching
- **quizSlice**: Quiz functionality and attempts

## 🎨 Design System

The app follows a consistent design system with:

- **Colors**: Primary (red), Secondary (teal), and semantic colors
- **Typography**: Scalable font sizes and weights
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation system for depth
- **Border Radius**: Consistent corner rounding

## 📊 Performance

- Optimized bundle size
- Lazy loading for screens
- Efficient state management
- Audio caching for offline use
- Minimal re-renders with proper memoization

## 🔮 Future Enhancements

- **AI Integration**: Advanced speech recognition and TTS
- **Social Features**: Leaderboards and community learning
- **Advanced Analytics**: Detailed learning insights
- **Content Expansion**: More languages and lesson types
- **Offline Mode**: Complete offline functionality
- **Accessibility**: Enhanced accessibility features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- AI4Bharat for language technology
- Expo team for the amazing development platform
- React Native community for continuous improvements
- All contributors and beta testers

---

**Built with ❤️ for India's linguistic diversity**
