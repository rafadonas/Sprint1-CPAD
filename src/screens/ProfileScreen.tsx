import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../types';
import { ToastKind } from '../components/AppToast';

interface ProfileScreenProps {
  onBack: () => void;
  ocorrencias: Ocorrencia[];
  onFeedback: (title: string, message: string, kind?: ToastKind) => void;
}

export const ProfileScreen = ({ onBack, ocorrencias, onFeedback }: ProfileScreenProps) => {
  const [notifications, setNotifications] = useState(true);
  const concluded = ocorrencias.filter((item) => item.status === 'Concluído').length;
  const analysing = ocorrencias.filter((item) => item.status === 'Em análise').length;

  const toggleNotifications = (value: boolean) => {
    setNotifications(value);
    onFeedback('Notificações atualizadas', value ? 'Alertas operacionais foram ativados.' : 'Alertas operacionais foram silenciados.', 'info');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} accessibilityRole="button" accessibilityLabel="Voltar ao mapa">
          <MaterialCommunityIcons name="chevron-left" size={28} color="#F8FAFC" />
        </TouchableOpacity>
        <View><Text style={styles.eyebrow}>CONTA DE CAMPO</Text><Text style={styles.title}>Perfil</Text></View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><MaterialCommunityIcons name="account-hard-hat" size={48} color="#86EFAC" /></View>
          <View style={styles.identity}><Text style={styles.userName}>Carlos Monteiro</Text><Text style={styles.userRole}>Inspetor de Campo · Motiva</Text><View style={styles.verified}><MaterialCommunityIcons name="check-decagram" size={14} color="#4ADE80" /><Text style={styles.verifiedText}>Perfil verificado</Text></View></View>
        </View>

        <Text style={styles.sectionLabel}>RESUMO OPERACIONAL</Text>
        <View style={styles.statsContainer}>
          <Stat value={ocorrencias.length} label="Relatos" />
          <View style={styles.statDivider} />
          <Stat value={analysing} label="Em análise" />
          <View style={styles.statDivider} />
          <Stat value={concluded} label="Resolvidos" />
        </View>

        <View style={styles.performanceCard}>
          <View style={styles.performanceHeader}><View><Text style={styles.performanceTitle}>Taxa de resolução</Text><Text style={styles.performanceHint}>Ocorrências concluídas nesta sessão</Text></View><Text style={styles.performanceValue}>{ocorrencias.length ? Math.round((concluded / ocorrencias.length) * 100) : 0}%</Text></View>
          <View style={styles.track}><View style={[styles.progress, { width: `${ocorrencias.length ? (concluded / ocorrencias.length) * 100 : 0}%` }]} /></View>
        </View>

        <Text style={styles.sectionLabel}>PREFERÊNCIAS</Text>
        <View style={styles.menu}>
          <View style={styles.menuButton}><View style={styles.menuIconRow}><MenuIcon name="bell-outline" /><View><Text style={styles.menuLabel}>Notificações</Text><Text style={styles.menuHint}>Riscos altos e equipes</Text></View></View><Switch value={notifications} onValueChange={toggleNotifications} trackColor={{ false: '#334155', true: '#27663C' }} thumbColor={notifications ? '#4ADE80' : '#94A3B8'} accessibilityLabel="Ativar notificações" /></View>
          <MenuButton icon="shield-check-outline" label="Segurança" hint="Sessão protegida" onPress={() => onFeedback('Sessão protegida', 'Último acesso realizado hoje neste dispositivo.', 'info')} />
          <MenuButton icon="help-circle-outline" label="Ajuda e suporte" hint="Central de atendimento" onPress={() => onFeedback('Ajuda e suporte', 'Canal demonstrativo: suporte@motiva.mock', 'info')} />
          <MenuButton icon="logout" label="Sair" hint="Encerrar sessão demonstrativa" color="#F87171" onPress={() => onFeedback('Modo demonstração', 'Nenhuma sessão real foi encerrada.', 'info')} />
        </View>
        <Text style={styles.version}>Motiva Verde · versão 1.0.0 · Sprint 3</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const Stat = ({ value, label }: { value: number; label: string }) => <View style={styles.statItem}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
const MenuIcon = ({ name, color = '#86EFAC' }: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color?: string }) => <View style={styles.menuIcon}><MaterialCommunityIcons name={name} size={21} color={color} /></View>;
const MenuButton = ({ icon, label, hint, color = '#F8FAFC', onPress }: { icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']; label: string; hint: string; color?: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.menuButton} onPress={onPress} accessibilityRole="button">
    <View style={styles.menuIconRow}><MenuIcon name={icon} color={color === '#F87171' ? color : '#86EFAC'} /><View><Text style={[styles.menuLabel, { color }]}>{label}</Text><Text style={styles.menuHint}>{hint}</Text></View></View>
    <MaterialCommunityIcons name="chevron-right" size={22} color="#64748B" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#08110C' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 24, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#1F3327' },
  backButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginRight: 5 },
  eyebrow: { color: '#4ADE80', fontSize: 9, fontWeight: '700', letterSpacing: 1.2 },
  title: { color: '#F8FAFC', fontSize: 24, fontWeight: '800' },
  content: { paddingHorizontal: 20, paddingBottom: 120 },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111C16', borderRadius: 17, borderWidth: 1, borderColor: '#294133', padding: 17, marginTop: 18 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#163722', borderWidth: 2, borderColor: '#275A39', alignItems: 'center', justifyContent: 'center' },
  identity: { flex: 1, marginLeft: 14 },
  userName: { color: '#F8FAFC', fontSize: 19, fontWeight: '800' },
  userRole: { color: '#94A3B8', fontSize: 12, marginTop: 3 },
  verified: { flexDirection: 'row', alignItems: 'center', marginTop: 7 },
  verifiedText: { color: '#86EFAC', fontSize: 10, fontWeight: '700', marginLeft: 5 },
  sectionLabel: { color: '#64748B', fontSize: 10, fontWeight: '800', letterSpacing: 1.1, marginTop: 24, marginBottom: 9 },
  statsContainer: { flexDirection: 'row', backgroundColor: '#111C16', borderRadius: 15, paddingVertical: 18, borderWidth: 1, borderColor: '#294133' },
  statItem: { flex: 1, alignItems: 'center' }, statValue: { color: '#F8FAFC', fontSize: 21, fontWeight: '800' }, statLabel: { color: '#94A3B8', fontSize: 10, marginTop: 3 }, statDivider: { width: 1, backgroundColor: '#294133' },
  performanceCard: { backgroundColor: '#111C16', borderRadius: 15, padding: 16, borderWidth: 1, borderColor: '#294133', marginTop: 10 },
  performanceHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, performanceTitle: { color: '#F8FAFC', fontSize: 13, fontWeight: '700' }, performanceHint: { color: '#64748B', fontSize: 10, marginTop: 2 }, performanceValue: { color: '#4ADE80', fontSize: 20, fontWeight: '800' },
  track: { height: 6, borderRadius: 3, backgroundColor: '#24372B', marginTop: 14, overflow: 'hidden' }, progress: { height: '100%', borderRadius: 3, backgroundColor: '#4ADE80' },
  menu: { gap: 9 }, menuButton: { minHeight: 66, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#111C16', paddingHorizontal: 13, paddingVertical: 11, borderRadius: 13, borderWidth: 1, borderColor: '#294133' }, menuIconRow: { flexDirection: 'row', alignItems: 'center', flex: 1 }, menuIcon: { width: 39, height: 39, borderRadius: 11, backgroundColor: '#183021', alignItems: 'center', justifyContent: 'center', marginRight: 11 }, menuLabel: { color: '#F8FAFC', fontSize: 14, fontWeight: '700' }, menuHint: { color: '#64748B', fontSize: 10, marginTop: 2 },
  version: { color: '#475569', fontSize: 10, textAlign: 'center', marginTop: 24 },
});
