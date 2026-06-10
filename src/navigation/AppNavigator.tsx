import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from '../screens/IntroScreen';
import SwipeScreen from '../screens/SwipeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import { Food } from '../types/index';

export type RootStackParamList = {
  Intro: undefined;
  Swipe: undefined;
  Results: {
    likedFoods: Food[];
    dislikedFoods: Food[];
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#070C0A' },
        }}
      >
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Swipe" component={SwipeScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
