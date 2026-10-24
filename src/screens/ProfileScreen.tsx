import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../types';
import { ToastKind } from '../components/AppToast';
import { ConfirmModal } from '../components/ConfirmModal';
import { ProfileSummary, sectionLabelStyle } from '../components/profile/ProfileSummary';
import { MenuItem, MenuSwitch } from '../components/profile/MenuItem';

interface ProfileScreenProps {
  onBack: () => void;
  ocorrencias: Ocorrencia[];
  onFeedback: (title: string, message: string, kind?: ToastKind) => void;
  onResetData: () => void;
}

export const ProfileScreen = ({
  onBack,
  ocorrencias,
  onFeedback,
  onResetData,
}: ProfileScreenProps) => {
  const [notifications, setNotifications] = useState(true);
  const [confirmReset, setConfirmReset] = useState(false);

  const toggleNotifications = (value: boolean) => {
    setNotifications(value);
    onFeedback(
      'Notificações atualizadas',
      value ? 'Alertas operacionais foram ativados.' : 'Alertas operacionais foram silenciados.',
      'info',
    );
  };

  const confirmDataReset = () => {
    setConfirmReset(false);
    onResetData();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Voltar ao mapa"
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color="#F8FAFC" />
        </TouchableOpacity>
        <View>
          <Text style={styles.eyebrow}>CONTA DE CAMPO</Text>
          <Text style={styles.title}>Perfil</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ProfileSummary ocorrencias={ocorrencias} />

        <Text style={sectionLabelStyle}>PREFERÊNCIAS</Text>
        <View style={styles.menu}>
          <MenuSwitch
            icon="bell-outline"
            label="Notificações"
            hint="Riscos altos e equipes"
            value={notifications}
            onValueChange={toggleNotifications}
          />
          <MenuItem
            icon="shield-check-outline"
            label="Segurança"
            hint="Sessão protegida"
            onPress={() =>
              onFeedback(
                'Sessão protegida',
                'Último acesso realizado hoje neste dispositivo.',
                'info',
              )
            }
          />
          <MenuItem
            icon="help-circle-outline"
            label="Ajuda e suporte"
            hint="Central de atendimento"
            onPress={() =>
              onFeedback('Ajuda e suporte', 'Canal demonstrativo: suporte@motiva.mock', 'info')
            }
          />
          <MenuItem
            icon="database-refresh-outline"
            label="Restaurar dados de demonstração"
            hint="Apaga registros salvos neste aparelho"
            onPress={() => setConfirmReset(true)}
          />
          <MenuItem
            icon="logout"
            label="Sair"
            hint="Encerrar sessão demonstrativa"
            danger
            onPress={() =>
              onFeedback('Modo demonstração', 'Nenhuma sessão real foi encerrada.', 'info')
            }
          />
        </View>
        <Text style={styles.version}>Motiva Verde · versão 1.1.0 · Sprint 4</Text>
      </ScrollView>

      <ConfirmModal
        visible={confirmReset}
        title="Restaurar dados?"
        message="Os registros feitos neste aparelho serão apagados e as ocorrências de demonstração serão recarregadas."
        confirmLabel="Restaurar"
        icon="database-refresh-outline"
        onCancel={() => setConfirmReset(false)}
        onConfirm={confirmDataReset}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08110C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F3327',
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  eyebrow: {
    color: '#4ADE80',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '800',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  menu: {
    gap: 9,
  },
  version: {
    color: '#475569',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 24,
  },
});
