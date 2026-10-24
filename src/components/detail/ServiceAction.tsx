import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusOcorrencia } from '../../types';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ActionConfig {
  label: string;
  icon: IconName;
  enabled: boolean;
}

// Cada status libera a próxima etapa do atendimento: despacho e depois conclusão.
export const SERVICE_ACTIONS: Record<StatusOcorrencia, ActionConfig> = {
  Pendente: { label: 'Despachar equipe', icon: 'truck-delivery-outline', enabled: true },
  'Em análise': { label: 'Concluir atendimento', icon: 'check-decagram-outline', enabled: true },
  Concluído: { label: 'Atendimento concluído', icon: 'check-circle-outline', enabled: false },
};

interface ServiceActionProps {
  status: StatusOcorrencia;
  onPress: () => void;
}

export const ServiceAction = ({ status, onPress }: ServiceActionProps) => {
  const { label, icon, enabled } = SERVICE_ACTIONS[status];

  return (
    <TouchableOpacity
      disabled={!enabled}
      style={[styles.action, !enabled && styles.disabled]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: !enabled }}
    >
      <MaterialCommunityIcons name={icon} size={21} color={enabled ? '#07120A' : '#86EFAC'} />
      <Text style={[styles.text, !enabled && styles.textDisabled]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  action: {
    marginHorizontal: 18,
    marginTop: 20,
    backgroundColor: '#4ADE80',
    borderRadius: 13,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabled: {
    backgroundColor: '#163722',
  },
  text: {
    color: '#07120A',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
  textDisabled: {
    color: '#86EFAC',
  },
});
