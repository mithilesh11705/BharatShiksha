import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../utils/constants';

// Import screens
import HomeScreen from '../screens/learning/HomeScreen';
import LessonsScreen from '../screens/learning/LessonsScreen';
import ProgressScreen from '../screens/learning/ProgressScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

// Import types
import { MainTabParamList } from '../utils/types';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Simple icon component (in a real app, you'd use react-native-vector-icons)
const TabIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }) => {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Text style={[styles.iconText, focused && styles.iconTextFocused]}>
        {name}
      </Text>
    </View>
  );
};

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = '🏠';
              break;
            case 'Lessons':
              iconName = '📚';
              break;
            case 'Progress':
              iconName = '📊';
              break;
            case 'Settings':
              iconName = '⚙️';
              break;
            default:
              iconName = '❓';
          }

          return <TabIcon name={iconName} focused={focused} />;
        },
        tabBarActiveTintColor: COLORS.primary.blue,
        tabBarInactiveTintColor: COLORS.text.secondary,
        tabBarStyle: {
          backgroundColor: COLORS.background.primary,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 6,
          paddingTop: 6,
          height: 50,
        },
        tabBarLabelStyle: {
          fontSize: TYPOGRAPHY.fontSize.xs,
          fontWeight: '500' as const,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Lessons" 
        component={LessonsScreen}
        options={{
          title: 'Lessons',
          tabBarLabel: 'Lessons',
        }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{
          title: 'Progress',
          tabBarLabel: 'Progress',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  iconContainerFocused: {
    backgroundColor: COLORS.background.card,
  },
  iconText: {
    fontSize: 14,
  },
  iconTextFocused: {
    color: COLORS.primary.blue,
  },
});

export default MainTabNavigator; 