import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
      <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
