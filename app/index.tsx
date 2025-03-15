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
      screenOptions={{
        tabBarActiveTintColor: '#2D4859',  // Darker shade for selected tab
        tabBarInactiveTintColor: '#3D5A68', // Lighter shade for unselected tab
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
              source={require('../assets/images/quran.png')} 
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
              source={require('../assets/images/home.png')} 
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
              source={require('../assets/images/dhikr.png')} 
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