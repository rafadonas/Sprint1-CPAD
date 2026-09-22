import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MOCK_OCORRENCIAS } from './src/data/mock';
import { Ocorrencia } from './src/types';
import { BottomNav, ScreenName } from './src/components/BottomNav';
import { MapScreen } from './src/screens/MapScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { ReportScreen } from './src/screens/ReportScreen';
import { DetailScreen } from './src/screens/DetailScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { AppToast, ToastMessage } from './src/components/AppToast';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName | 'DETAIL'>('MAP');
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(MOCK_OCORRENCIAS);
  const [selectedOccurrence, setSelectedOccurrence] = useState<Ocorrencia | null>(null);
  const [detailOrigin, setDetailOrigin] = useState<ScreenName>('MAP');
  const [reportOrigin, setReportOrigin] = useState<ScreenName>('MAP');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (title: string, message: string, kind: ToastMessage['kind'] = 'success') => {
    setToast({ id: Date.now(), title, message, kind });
  };

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (currentScreen === 'DETAIL') {
        setCurrentScreen(detailOrigin);
        return true;
      }
      if (currentScreen === 'REPORT') {
        setCurrentScreen(reportOrigin);
        return true;
      }
      if (currentScreen === 'HISTORY' || currentScreen === 'PROFILE') {
        setCurrentScreen('MAP');
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [currentScreen, detailOrigin, reportOrigin]);

  const handleNavigate = (screen: ScreenName) => {
    if (screen === 'REPORT' && currentScreen !== 'DETAIL') {
      setReportOrigin(currentScreen as ScreenName);
    }
    setCurrentScreen(screen);
  };

  const handleSelectOccurrence = (occurrence: Ocorrencia) => {
    if (currentScreen === 'MAP' || currentScreen === 'HISTORY') {
      setDetailOrigin(currentScreen);
    }
    setSelectedOccurrence(occurrence);
    setCurrentScreen('DETAIL');
  };

  const handleAddOccurrence = (newOccurrence: Ocorrencia) => {
    setOcorrencias((current) => [newOccurrence, ...current]);
    setCurrentScreen('HISTORY');
    showToast('Ocorrência registrada', `${newOccurrence.local} foi adicionada ao histórico e aguarda análise.`);
  };

  const handleDispatch = (id: string) => {
    setOcorrencias((current) => current.map((item) => item.id === id ? {
      ...item,
      status: 'Em análise',
      previsaoIntervencao: item.risco === 'alto' ? 'Até 24 horas' : 'Até 72 horas',
      historico: [...item.historico, {
        data: new Date().toISOString(),
        titulo: 'Equipe despachada',
        descricao: 'Ordem de serviço enviada para a equipe de manutenção.',
      }],
    } : item));
    setSelectedOccurrence((current) => current?.id === id ? {
      ...current,
      status: 'Em análise',
      previsaoIntervencao: current.risco === 'alto' ? 'Até 24 horas' : 'Até 72 horas',
      historico: [...current.historico, {
        data: new Date().toISOString(),
        titulo: 'Equipe despachada',
        descricao: 'Ordem de serviço enviada para a equipe de manutenção.',
      }],
    } : current);
    showToast('Equipe acionada', 'A ordem de serviço foi criada e a ocorrência está em análise.');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'MAP':
        return (
          <MapScreen 
            ocorrencias={ocorrencias} 
            onSelectOccurrence={handleSelectOccurrence} 
            onNavigateToReport={() => handleNavigate('REPORT')}
          />
        );
      case 'HISTORY':
        return (
          <HistoryScreen 
            ocorrencias={ocorrencias} 
            onSelectOccurrence={handleSelectOccurrence} 
            onNavigateToReport={() => handleNavigate('REPORT')}
            onBack={() => setCurrentScreen('MAP')}
          />
        );
      case 'REPORT':
        return (
          <ReportScreen 
            onAddOccurrence={handleAddOccurrence} 
            onCancel={() => setCurrentScreen(reportOrigin)}
          />
        );
      case 'PROFILE':
        return <ProfileScreen ocorrencias={ocorrencias} onBack={() => setCurrentScreen('MAP')} onFeedback={showToast} />;
      case 'DETAIL':
        return selectedOccurrence ? (
          <DetailScreen 
            occurrence={selectedOccurrence} 
            onBack={() => setCurrentScreen(detailOrigin)}
            onDispatch={handleDispatch}
          />
        ) : <MapScreen ocorrencias={ocorrencias} onSelectOccurrence={handleSelectOccurrence} onNavigateToReport={() => handleNavigate('REPORT')} />;
      default:
        return <MapScreen ocorrencias={ocorrencias} onSelectOccurrence={handleSelectOccurrence} onNavigateToReport={() => setCurrentScreen('REPORT')} />;
    }
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.content}>
          {renderScreen()}
        </View>
        {currentScreen !== 'REPORT' && currentScreen !== 'DETAIL' && (
          <BottomNav activeScreen={currentScreen as ScreenName} onNavigate={handleNavigate} />
        )}
        {toast ? <AppToast toast={toast} onDismiss={dismissToast} /> : null}
      </View>
    </SafeAreaProvider>
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
