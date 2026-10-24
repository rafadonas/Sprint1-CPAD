import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../../types';
import { formatDate } from '../../utils/occurrence';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface InspectionDetailsProps {
  occurrence: Ocorrencia;
}

export const InspectionDetails = ({ occurrence }: InspectionDetailsProps) => (
  <>
    <View style={styles.priority}>
      <MaterialCommunityIcons name="calendar-alert" size={23} color="#4ADE80" />
      <View>
        <Text style={styles.priorityLabel}>INTERVENÇÃO RECOMENDADA</Text>
        <Text style={styles.priorityValue}>{occurrence.previsaoIntervencao}</Text>
      </View>
    </View>

    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Dados da inspeção</Text>
      <InfoRow icon="ruler" label="Altura estimada" value={`${occurrence.alturaGrama} cm`} />
      <InfoRow icon="calendar-clock" label="Registrado em" value={formatDate(occurrence.data)} />
      <InfoRow icon="account-hard-hat" label="Inspetor" value={occurrence.inspetor} />
      <InfoRow
        icon="crosshairs-gps"
        label="Coordenadas"
        value={`${occurrence.latitude}, ${occurrence.longitude}`}
      />
    </View>

    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Descrição</Text>
      <Text style={styles.description}>{occurrence.descricao}</Text>
      <View style={styles.tags}>
        {occurrence.tags.map((tag) => (
          <View style={styles.tag} key={tag}>
            <MaterialCommunityIcons name="leaf" size={12} color="#86EFAC" />
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  </>
);

interface InfoRowProps {
  icon: IconName;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <View style={styles.info}>
    <View style={styles.infoLabel}>
      <MaterialCommunityIcons name={icon} size={17} color="#94A3B8" />
      <Text style={styles.infoLabelText}>{label}</Text>
    </View>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  priority: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#10251A',
    padding: 16,
    margin: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#275A39',
  },
  priorityLabel: {
    color: '#86EFAC',
    fontSize: 9,
    letterSpacing: 0.9,
    fontWeight: '700',
  },
  priorityValue: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#111C16',
    marginHorizontal: 18,
    marginBottom: 13,
    padding: 17,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294133',
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '800',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#21362A',
    paddingVertical: 12,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabelText: {
    color: '#94A3B8',
    fontSize: 12,
    marginLeft: 7,
  },
  infoValue: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    maxWidth: '52%',
    textAlign: 'right',
  },
  description: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 11,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 14,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#183021',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  tagText: {
    color: '#BBF7D0',
    fontSize: 10,
    marginLeft: 4,
  },
});
