// app.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import { QadrColorSchema } from '../constants/colors';

// Import screens
import HomeScreen from './homeScreen';
import QuranScreen from './quranScreen';
import DhikrScreen from './dhikrScreen';

// Create Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: QadrColorSchema.backgroundColor,
        tabBarInactiveTintColor: QadrColorSchema.tertiaryColor2,
        tabBarStyle: {
          backgroundColor: QadrColorSchema.secondaryColor1,
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 10,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Quran" 
        component={QuranScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
            source={
              focused 
                ? require('../assets/images/quranFocused.png') 
                : require('../assets/images/quranUnfocused.png')
            } 
              style={styles.tabIcon}
            />
          ),
          tabBarLabelStyle: (props) => {
            const { focused } = props || {};
            return {
              fontFamily: focused ? 'zainExtraBold' : 'zainRegular',
              fontSize: focused ? 12 : 8,
              color: focused ? QadrColorSchema.tertiaryColor1 : QadrColorSchema.tertiaryColor2,
            };
          },
        }}
      />
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
            source={
              focused 
                ? require('../assets/images/homeFocused.png') 
                : require('../assets/images/homeUnfocused.png')
            } 
              style={styles.tabIcon}
            />
          ),
          tabBarLabelStyle: (props) => {
            const { focused } = props || {};
            return {
              fontFamily: focused ? 'zainExtraBold' : 'zainRegular',
              fontSize: focused ? 12 : 8,
              color: focused ? QadrColorSchema.tertiaryColor1 : QadrColorSchema.tertiaryColor2,
            };
          },
        }}
      />
      <Tab.Screen 
        name="Dhikr" 
        component={DhikrScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
            source={
              focused 
                ? require('../assets/images/dhikrFocused.png') 
                : require('../assets/images/dhikrUnfocused.png')
            } 
              style={styles.tabIcon}
            />
          ),
          tabBarLabelStyle: (props) => {
            const { focused } = props || {};
            return {
              fontFamily: focused ? 'zainExtraBold' : 'zainRegular',
              fontSize: focused ? 12 : 8,
              color: focused ? QadrColorSchema.tertiaryColor1 : QadrColorSchema.tertiaryColor2,
            };
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});