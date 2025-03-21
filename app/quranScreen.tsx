import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { QadrColorSchema } from '../constants/colors';
import { Feather } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import axios from 'axios';


// Define types for our data
interface SurahItem {
  surahNumber: number;
  surahNameEnglish: string;
  surahNameArabic: string;
  revelationPlace: string;
  totalAyah: number;
}

export default function QuranScreen() {
  const [activeTab, setActiveTab] = useState<'Surah' | 'Juz' | 'Favourite'>('Surah');

  const [surahs, setSurahs] = useState<SurahItem[]>([]);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/getSurahList/');
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

        console.log('Parsed data:', data);
        console.log('Data type:', typeof data);
        console.log('Is array?', Array.isArray(data));
        
        if (Array.isArray(data)) {
          console.log('Array length:', data.length);
          if (data.length > 0) {
            console.log('First item example:', data[0]);
          }
        }

        const formattedData: SurahItem[] = Array.isArray(data) ? data.map(item => ({
          surahNumber: item.surahNumber,
          surahNameEnglish: item.surahNameEnglish,
          surahNameArabic: item.surahNameArabic,
          revelationPlace: item.revelationPlace,
          totalAyah: item.totalAyah
        })) : [];
        
        console.log('Formatted data:', formattedData);
        console.log('Formatted data length:', formattedData.length);


        setSurahs(formattedData);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      }
    };

    fetchSurahs();
  }, []);

  const renderSurahItem = ({ item }: { item: SurahItem }) => (
    <TouchableOpacity style={styles.surahItem}>
      <View style={styles.surahLeft}>
        <View style={styles.surahNumberContainer}>
        <ImageBackground 
          source={require('../assets/images/starIcon.png')} 
          style={styles.surahNumberBackground}
          resizeMode="contain"
        >
          <Text style={styles.surahNumber}>{item.surahNumber}</Text>
        </ImageBackground>
        </View>
        <View style={styles.surahDetails}>
          <Text style={styles.surahName}>{item.surahNameEnglish}</Text>
          <Text style={styles.surahInfo}>{item.revelationPlace} - {item.totalAyah} Verses</Text>
        </View>
      </View>
      <Text style={styles.arabicName}>{item.surahNameArabic}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Arabic title */}
      <Text style={styles.headerTitle}>القرآن</Text>
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Surah' ? styles.activeTab : null]} 
          onPress={() => setActiveTab('Surah')}
        >
          <Text style={[styles.tabText, activeTab === 'Surah' ? styles.activeTabText : null]}>Surah</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Juz' ? styles.activeTab : null]} 
          onPress={() => setActiveTab('Juz')}
        >
          <Text style={[styles.tabText, activeTab === 'Juz' ? styles.activeTabText : null]}>Juz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Favorite' ? styles.activeTab : null]} 
          onPress={() => setActiveTab('Favorite')}
        >
          <Text style={[styles.tabText, activeTab === 'Favorite' ? styles.activeTabText : null]}>Favorite</Text>
        </TouchableOpacity>
      </View>
      
      {/* Surah List */}
      <FlatList
        data={surahs}
        renderItem={renderSurahItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContainer}
      />
      {/* Note: Bottom navbar is handled separately as mentioned */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3240', // Dark blue background from image
  },
  headerTitle: {
    fontFamily: 'amiriRegular', // Make sure this font is loaded in your app
    fontSize: 24,
    color: QadrColorSchema.secondaryColor1,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: QadrColorSchema.tertiaryColor2,
  },
  activeTab: {
    backgroundColor: QadrColorSchema.tertirayColor3,
  },
  tabText: {
    color: QadrColorSchema.secondaryColor2,
    fontFamily: 'zainRegular',
    fontSize: 18,
  },
  activeTabText: {
    fontWeight: '600',
    fontFamily: 'zainBold',
    color: QadrColorSchema.secondaryColor1,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 100, // Allow space for the bottom navigation
  },
  surahItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: QadrColorSchema.tertirayColor3,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  surahLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  surahNumberContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  surahNumberBackground: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahNumber: {
    color: QadrColorSchema.secondaryColor1,
    fontSize: 12,
    fontFamily: 'zainRegular',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  surahDetails: {
    justifyContent: 'center',
  },
  surahName: {
    color: QadrColorSchema.secondaryColor1,
    fontFamily: 'zainRegular',
    fontSize: 20,
    fontWeight: '500',
  },
  surahInfo: {
    color: QadrColorSchema.secondaryColor2,
    fontFamily: 'zainRegular',
    fontSize: 16,
    marginTop: 2,
  },
  arabicName: {
    fontFamily: 'amiriRegular', // Make sure this font is loaded
    color: QadrColorSchema.secondaryColor1,
    fontSize: 22,
  },
});