import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MOCK_OCORRENCIAS } from './src/data/mock';
import { loadOccurrences, resetOccurrences, saveOccurrences } from './src/services/storage';
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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadOccurrences().then((stored) => {
      setOcorrencias(stored);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) saveOccurrences(ocorrencias);
  }, [hydrated, ocorrencias]);

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

  const updateOccurrence = (id: string, changes: Pick<Ocorrencia, 'status' | 'previsaoIntervencao'>, event: { titulo: string; descricao: string }) => {
    const apply = (item: Ocorrencia): Ocorrencia => ({
      ...item,
      ...changes,
      historico: [...item.historico, { data: new Date().toISOString(), ...event }],
    });
    setOcorrencias((current) => current.map((item) => item.id === id ? apply(item) : item));
    setSelectedOccurrence((current) => current?.id === id ? apply(current) : current);
  };

  const handleDispatch = (id: string) => {
    const occurrence = ocorrencias.find((item) => item.id === id);
    updateOccurrence(id, {
      status: 'Em análise',
      previsaoIntervencao: occurrence?.risco === 'alto' ? 'Até 24 horas' : 'Até 72 horas',
    }, {
      titulo: 'Equipe despachada',
      descricao: 'Ordem de serviço enviada para a equipe de manutenção.',
    });
    showToast('Equipe acionada', 'A ordem de serviço foi criada e a ocorrência está em análise.');
  };

  const handleConclude = (id: string) => {
    updateOccurrence(id, { status: 'Concluído', previsaoIntervencao: 'Concluída' }, {
      titulo: 'Serviço concluído',
      descricao: 'Roçagem executada e trecho liberado pela equipe de manutenção.',
    });
    showToast('Atendimento concluído', 'O trecho foi liberado e a ocorrência foi encerrada.');
  };

  const handleResetData = async () => {
    setOcorrencias(await resetOccurrences());
    showToast('Dados restaurados', 'As ocorrências de demonstração foram recarregadas.', 'info');
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
        return <ProfileScreen ocorrencias={ocorrencias} onBack={() => setCurrentScreen('MAP')} onFeedback={showToast} onResetData={handleResetData} />;
      case 'DETAIL':
        return selectedOccurrence ? (
          <DetailScreen 
            occurrence={selectedOccurrence} 
            onBack={() => setCurrentScreen(detailOrigin)}
            onDispatch={handleDispatch}
            onConclude={handleConclude}
          />
        ) : <MapScreen ocorrencias={ocorrencias} onSelectOccurrence={handleSelectOccurrence} onNavigateToReport={() => handleNavigate('REPORT')} />;
      default:
        return <MapScreen ocorrencias={ocorrencias} onSelectOccurrence={handleSelectOccurrence} onNavigateToReport={() => setCurrentScreen('REPORT')} />;
    }
  };

  if (!hydrated) {
    return (
      <View style={[styles.container, styles.loading]}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#4ADE80" />
      </View>
    );
  }

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
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
