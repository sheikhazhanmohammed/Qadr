import React, { createContext, useEffect, useState } from 'react';
import { Stack } from "expo-router";
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import { QadrColorSchema } from '../constants/colors';
import * as Location from 'expo-location';

// Define the location context type
type UserLocationParameters = {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  errorMsg: string | null;
};

export const UserLocationContext = createContext<UserLocationParameters>({
  location: null,
  errorMsg: null,
});

export default function RootLayout() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    async function loadInitialData() {
      try {
        await Font.loadAsync({
          // Add multiple fonts if needed
          'zainBlack': require('../assets/fonts/Zain-Black.ttf'),
          'zainBold': require('../assets/fonts/Zain-Bold.ttf'),
          'zainExtraBold': require('../assets/fonts/Zain-ExtraBold.ttf'),
          'zainExtraLight': require('../assets/fonts/Zain-ExtraLight.ttf'),
          'zainItalic': require('../assets/fonts/Zain-Italic.ttf'),
          'zainLight': require('../assets/fonts/Zain-Light.ttf'),
          'zainLightItalic': require('../assets/fonts/Zain-LightItalic.ttf'),
          'zainRegular': require('../assets/fonts/Zain-Regular.ttf'),
        });

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setIsLoading(false);
          return;
        }

        // Get current location
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        
        setDataLoaded(true);
      } catch (error) {
        console.error('Data loading error:', error);
      }
    }

    loadInitialData();
  }, []);
  // Show a loading indicator while fonts are loading
  if (!dataLoaded) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: QadrColorSchema.backgroundColor 
      }}>
        <ActivityIndicator size="large" color={QadrColorSchema.primaryColor1} />
      </View>
    );
  }

  return (
    <UserLocationContext.Provider value={{ location, errorMsg }}>
      <Stack screenOptions={{ headerShown: false }} />
    </UserLocationContext.Provider>
  );
}