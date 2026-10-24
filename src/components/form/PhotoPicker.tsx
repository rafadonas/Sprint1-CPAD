import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PhotoSource } from '../../hooks/usePhotoPicker';
import { fieldStyles } from './FormField';

interface PhotoPickerProps {
  photoUri: string | null;
  error: string | null;
  onPick: (source: PhotoSource) => void;
  onRemove: () => void;
}

export const PhotoPicker = ({ photoUri, error, onPick, onRemove }: PhotoPickerProps) => (
  <>
    {photoUri ? (
      <View style={styles.preview}>
        <Image
          source={{ uri: photoUri }}
          style={styles.previewImage}
          accessibilityLabel="Foto anexada à ocorrência"
        />
        <TouchableOpacity
          style={styles.removePhoto}
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel="Remover foto"
        >
          <MaterialCommunityIcons name="trash-can-outline" size={18} color="#F8FAFC" />
          <Text style={styles.removePhotoText}>Remover</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.actions}>
        <SourceButton
          icon="camera-plus-outline"
          title="Tirar foto"
          hint="Câmera do aparelho"
          accessibilityLabel="Tirar foto com a câmera"
          onPress={() => onPick('camera')}
        />
        <SourceButton
          icon="image-plus"
          title="Galeria"
          hint="Imagem existente"
          accessibilityLabel="Escolher foto da galeria"
          onPress={() => onPick('library')}
        />
      </View>
    )}
    {error ? <Text style={[fieldStyles.error, styles.error]}>{error}</Text> : null}
  </>
);

interface SourceButtonProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  hint: string;
  accessibilityLabel: string;
  onPress: () => void;
}

const SourceButton = ({ icon, title, hint, accessibilityLabel, onPress }: SourceButtonProps) => (
  <TouchableOpacity
    style={styles.source}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
  >
    <MaterialCommunityIcons name={icon} size={30} color="#94A3B8" />
    <Text style={styles.sourceTitle}>{title}</Text>
    <Text style={styles.sourceHint}>{hint}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  source: {
    flex: 1,
    height: 125,
    backgroundColor: '#111C16',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#33483B',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sourceTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 7,
  },
  sourceHint: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 3,
  },
  preview: {
    height: 190,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removePhoto: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(8,17,12,0.88)',
    borderRadius: 16,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  removePhotoText: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 5,
  },
  error: {
    marginTop: -16,
    marginBottom: 18,
  },
});
