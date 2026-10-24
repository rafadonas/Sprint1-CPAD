import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export type PhotoSource = 'camera' | 'library';

const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  quality: 0.6,
  allowsEditing: false,
};

/** Captura uma foto pela câmera ou escolhe uma imagem da galeria. */
export const usePhotoPicker = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const pickPhoto = async (source: PhotoSource) => {
    setPhotoError(null);
    try {
      if (source === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          setPhotoError(
            'Permissão de câmera negada. Use a galeria ou libere o acesso nas configurações.',
          );
          return;
        }
      }
      const result =
        source === 'camera'
          ? await ImagePicker.launchCameraAsync(PICKER_OPTIONS)
          : await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS);
      if (!result.canceled && result.assets[0]) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch {
      setPhotoError('Não foi possível acessar a câmera neste dispositivo. Tente pela galeria.');
    }
  };

  const removePhoto = () => setPhotoUri(null);

  return { photoUri, photoError, pickPhoto, removePhoto };
};
