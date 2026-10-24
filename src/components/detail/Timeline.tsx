import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../../types';
import { formatDate } from '../../utils/occurrence';

interface TimelineProps {
  events: Ocorrencia['historico'];
  expanded: boolean;
  onToggle: () => void;
}

export const Timeline = ({ events, expanded, onToggle }: TimelineProps) => (
  <>
    <TouchableOpacity
      style={styles.toggle}
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityState={{ expanded }}
    >
      <View style={styles.toggleLabel}>
        <MaterialCommunityIcons name="timeline-clock-outline" size={21} color="#4ADE80" />
        <View>
          <Text style={styles.title}>Linha do tempo</Text>
          <Text style={styles.count}>
            {events.length} {events.length === 1 ? 'evento' : 'eventos'}
          </Text>
        </View>
      </View>
      <MaterialCommunityIcons
        name={expanded ? 'chevron-up' : 'chevron-down'}
        size={23}
        color="#94A3B8"
      />
    </TouchableOpacity>

    {expanded ? (
      <View style={styles.list}>
        {events.map((event, index) => (
          <View style={styles.event} key={`${event.data}-${index}`}>
            <View style={styles.dot} />
            <View style={styles.eventCopy}>
              <Text style={styles.eventTitle}>{event.titulo}</Text>
              <Text style={styles.eventDate}>{formatDate(event.data)}</Text>
              <Text style={styles.eventDescription}>{event.descricao}</Text>
            </View>
          </View>
        ))}
      </View>
    ) : null}
  </>
);

const styles = StyleSheet.create({
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#111C16',
    borderWidth: 1,
    borderColor: '#294133',
  },
  toggleLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '800',
  },
  count: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
  },
  list: {
    marginHorizontal: 30,
    paddingTop: 15,
  },
  event: {
    flexDirection: 'row',
    minHeight: 70,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4ADE80',
    marginTop: 5,
    marginRight: 13,
  },
  eventCopy: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#294133',
    paddingLeft: 13,
    paddingBottom: 15,
  },
  eventTitle: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  eventDate: {
    color: '#4ADE80',
    fontSize: 10,
    marginTop: 2,
  },
  eventDescription: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
  },
});
