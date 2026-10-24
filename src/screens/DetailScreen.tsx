import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ocorrencia } from '../types';
import { ConfirmModal } from '../components/ConfirmModal';
import { DetailHeader } from '../components/detail/DetailHeader';
import { EvidenceHero } from '../components/detail/EvidenceHero';
import { InspectionDetails } from '../components/detail/InspectionDetails';
import { Timeline } from '../components/detail/Timeline';
import { ServiceAction } from '../components/detail/ServiceAction';

interface DetailScreenProps {
  occurrence: Ocorrencia;
  onBack: () => void;
  onDispatch: (id: string) => void;
  onConclude: (id: string) => void;
}

export const DetailScreen = ({ occurrence, onBack, onDispatch, onConclude }: DetailScreenProps) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isDispatch = occurrence.status === 'Pendente';
  const place = `${occurrence.local}, ${occurrence.rodovia}`;

  const confirmAction = () => {
    setShowConfirmation(false);
    if (isDispatch) {
      onDispatch(occurrence.id);
    } else {
      onConclude(occurrence.id);
    }
    setShowHistory(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <DetailHeader occurrence={occurrence} onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content}>
        <EvidenceHero occurrence={occurrence} />
        <InspectionDetails occurrence={occurrence} />
        <Timeline
          events={occurrence.historico}
          expanded={showHistory}
          onToggle={() => setShowHistory((value) => !value)}
        />
        <ServiceAction status={occurrence.status} onPress={() => setShowConfirmation(true)} />
      </ScrollView>

      <ConfirmModal
        visible={showConfirmation}
        title={isDispatch ? 'Despachar equipe?' : 'Concluir atendimento?'}
        message={
          isDispatch
            ? `Uma ordem de serviço será criada para ${place}.`
            : `Confirme que a roçagem em ${place} foi executada e o trecho está liberado.`
        }
        confirmLabel={isDispatch ? 'Despachar' : 'Concluir'}
        icon={isDispatch ? 'truck-delivery-outline' : 'check-decagram-outline'}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={confirmAction}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08110C',
  },
  content: {
    paddingBottom: 40,
  },
});
