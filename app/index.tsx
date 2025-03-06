import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { QadrColorSchema } from '../constants/colors';
import { UserLocationContext } from './_layout';
import { formatIslamicDate } from './utils';
import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from 'adhan';

// Prayer times interface
interface PrayerTime {
  name: string;
  time: string;
}

export default function Index() {
  const { location, errorMsg } = useContext(UserLocationContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<string>('');
  const [nextPrayerTime, setNextPrayerTime] = useState<string>('');

  useEffect(() => {
    if (location) {
      // Calculate prayer times when location is available
      const coordinates = new Coordinates(location.latitude, location.longitude);
      const params = CalculationMethod.MoonsightingCommittee();
      const date = new Date();
      const prayerTimeQadr = new PrayerTimes(coordinates, date, params);
      
      // Get next prayer information
      const next = prayerTimeQadr.nextPrayer();
      
      // Format prayer times
      const formatPrayerTime = (time: Date) => {
        return time.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
      };

      // Format next prayer time
      let formattedNextPrayerTime = '';
      if (next) {
        const nextTime = prayerTimeQadr.timeForPrayer(next);
        if (nextTime) {
          formattedNextPrayerTime = formatPrayerTime(nextTime);
          setNextPrayerTime(formattedNextPrayerTime);
          
          // Convert Prayer enum to readable name
          const prayerNames: Record<Prayer, string> = {
            [Prayer.Fajr]: 'Fajr',
            [Prayer.Sunrise]: 'Sunrise',
            [Prayer.Dhuhr]: 'Dhuhr',
            [Prayer.Asr]: 'Asr',
            [Prayer.Maghrib]: 'Maghrib',
            [Prayer.Isha]: 'Isha',
            [Prayer.None]: 'None'
          };
          
          setNextPrayer(prayerNames[next]);
        }
      }

      // Set prayer times
      setPrayerTimes([
        { name: 'Fajr', time: formatPrayerTime(prayerTimeQadr.fajr) },
        { name: 'Dhuhr', time: formatPrayerTime(prayerTimeQadr.dhuhr) },
        { name: 'Asr', time: formatPrayerTime(prayerTimeQadr.asr) },
        { name: 'Maghrib', time: formatPrayerTime(prayerTimeQadr.maghrib) },
        { name: 'Isha', time: formatPrayerTime(prayerTimeQadr.isha) }
      ]);
    }
  }, [location]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.greetingText}>As Salam A Laikum</Text>
        <Text style={styles.dateText}>{formatIslamicDate()}</Text>
      </View>

      <View style={styles.prayerScheduleContainer}>
        <View style={styles.prayerTimesGrid}>
          {prayerTimes.map((prayer, index) => (
            <View key={index} style={styles.prayerTimeCard}>
              <Text style={styles.prayerName}>{prayer.name}</Text>
              <Text style={styles.prayerTime}>{prayer.time}</Text>
            </View>
          ))}
        </View>

        <View style={styles.nextPrayerContainer}>
          <Text style={styles.nextPrayerText}>
            {location ? 
              `Next Prayer: ${nextPrayer} at ${nextPrayerTime}` :
              "Location not available"
            }
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: QadrColorSchema.backgroundColor,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  greetingText: {
    fontFamily: 'zainRegular',
    fontSize: 18,
    color: QadrColorSchema.secondaryColor1,
  },
  dateText: {
    fontFamily: 'zainRegular',
    fontSize: 14,
    color: QadrColorSchema.secondaryColor1,
  },
  prayerScheduleContainer: {
    paddingHorizontal: '5%',
    marginBottom: 20,
  },
  prayerTimesGrid: {
    flexDirection: 'column',
    backgroundColor: QadrColorSchema.secondaryColor2,
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
  prayerTimeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: QadrColorSchema.tertiaryColor2,
    padding: 5,
    borderRadius: 5,
  },
  prayerName: {
    fontFamily: 'zainExtraBold',
    color: QadrColorSchema.secondaryColor1,
    fontSize: 16,
  },
  prayerTime: {
    fontFamily: 'zainRegular',
    color: QadrColorSchema.secondaryColor1, // For better visibility
    fontSize: 14,
  },
  nextPrayerContainer: {
    backgroundColor: QadrColorSchema.secondaryColor2,
    padding: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  nextPrayerText: {
    fontFamily: 'zainRegular',
    color: QadrColorSchema.tertiaryColor1,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5,
  },
  locationText: {
    fontFamily: 'zainRegular',
    color: QadrColorSchema.tertiaryColor1,
    textAlign: 'center',
    fontSize: 12,
  },
});