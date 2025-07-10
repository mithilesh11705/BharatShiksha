import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Import screens
import LanguageSelectScreen from '../screens/auth/LanguageSelectScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import MainTabNavigator from './MainTabNavigator';
import LessonScreen from '../screens/learning/LessonScreen';
import QuizScreen from '../screens/learning/QuizScreen';
import ProgressScreen from '../screens/learning/ProgressScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';

// Import types
import { RootStackParamList } from '../utils/types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const isUserInitialized = useSelector((state: RootState) => state.user.isInitialized);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      {!isUserInitialized ? (
        // Auth Flow
        <>
          <Stack.Screen 
            name="LanguageSelect" 
            component={LanguageSelectScreen}
            options={{
              title: 'Choose Language',
            }}
          />
          <Stack.Screen 
            name="Onboarding" 
            component={OnboardingScreen}
            options={{
              title: 'Welcome to BharatShiksha',
            }}
          />
        </>
      ) : (
        // Main App Flow
        <>
          <Stack.Screen 
            name="Main" 
            component={MainTabNavigator}
            options={{
              title: 'BharatShiksha',
            }}
          />
          <Stack.Screen 
            name="Lesson" 
            component={LessonScreen}
            options={{
              title: 'Lesson',
              headerShown: true,
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen 
            name="Quiz" 
            component={QuizScreen}
            options={{
              title: 'Quiz',
              headerShown: true,
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen 
            name="Progress" 
            component={ProgressScreen}
            options={{
              title: 'Learning Progress',
              headerShown: true,
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              title: 'Settings',
              headerShown: true,
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
              title: 'Profile',
              headerShown: true,
              headerBackTitle: 'Back',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator; 