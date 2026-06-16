import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ProfileScreenProps {
  onBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={30} color="#f9f9f9" />
        </TouchableOpacity>
        <Text style={styles.title}>Perfil</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={60} color="#a0a0a0" />
          </View>
          <Text style={styles.userName}>Carlos Monteiro</Text>
          <Text style={styles.userRole}>Inspetor de Campo · Motiva</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Relatos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Resolvidos</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <MenuButton icon="bell-outline" label="Notificações" />
          <MenuButton icon="shield-check-outline" label="Segurança" />
          <MenuButton icon="help-circle-outline" label="Ajuda & Suporte" />
          <MenuButton icon="logout" label="Sair" color="#ff6366" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const MenuButton = ({ icon, label, color = '#f9f9f9' }: { icon: any; label: string; color?: string }) => (
  <TouchableOpacity style={styles.menuButton}>
    <View style={styles.menuIconRow}>
      <MaterialCommunityIcons name={icon} size={24} color={color} />
      <Text style={[styles.menuLabel, { color }]}>{label}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={24} color="#333" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  title: {
    color: '#f9f9f9',
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  userName: {
    color: '#f9f9f9',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userRole: {
    color: '#a0a0a0',
    fontSize: 14,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#f9f9f9',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#333',
  },
  menu: {
    gap: 12,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  menuIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
});
