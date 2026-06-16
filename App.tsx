import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MOCK_OCORRENCIAS } from './src/data/mock';
import { Ocorrencia } from './src/types';
import { BottomNav, ScreenName } from './src/components/BottomNav';
import { MapScreen } from './src/screens/MapScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { ReportScreen } from './src/screens/ReportScreen';
import { DetailScreen } from './src/screens/DetailScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName | 'DETAIL'>('MAP');
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(MOCK_OCORRENCIAS);
  const [selectedOccurrence, setSelectedOccurrence] = useState<Ocorrencia | null>(null);

  const handleNavigate = (screen: ScreenName) => {
    setCurrentScreen(screen);
  };

  const handleSelectOccurrence = (occurrence: Ocorrencia) => {
    setSelectedOccurrence(occurrence);
    setCurrentScreen('DETAIL');
  };

  const handleAddOccurrence = (newOccurrence: Ocorrencia) => {
    setOcorrencias([newOccurrence, ...ocorrencias]);
    setCurrentScreen('HISTORY');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'MAP':
        return (
          <MapScreen 
            ocorrencias={ocorrencias} 
            onSelectOccurrence={handleSelectOccurrence} 
            onNavigateToReport={() => setCurrentScreen('REPORT')}
          />
        );
      case 'HISTORY':
        return (
          <HistoryScreen 
            ocorrencias={ocorrencias} 
            onSelectOccurrence={handleSelectOccurrence} 
          />
        );
      case 'REPORT':
        return (
          <ReportScreen 
            onAddOccurrence={handleAddOccurrence} 
            onCancel={() => setCurrentScreen('MAP')} 
          />
        );
      case 'PROFILE':
        return <ProfileScreen onBack={() => setCurrentScreen('MAP')} />;
      case 'DETAIL':
        return selectedOccurrence ? (
          <DetailScreen 
            occurrence={selectedOccurrence} 
            onBack={() => setCurrentScreen('HISTORY')} 
          />
        ) : null;
      default:
        return <MapScreen ocorrencias={ocorrencias} onSelectOccurrence={handleSelectOccurrence} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {renderScreen()}
      </View>
      {currentScreen !== 'REPORT' && currentScreen !== 'DETAIL' && (
        <BottomNav activeScreen={currentScreen as ScreenName} onNavigate={handleNavigate} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
  },
});
