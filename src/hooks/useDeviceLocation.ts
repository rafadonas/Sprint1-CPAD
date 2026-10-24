import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';

export type GpsState =
  | { status: 'loading' }
  | { status: 'ok'; latitude: number; longitude: number; accuracy: number | null }
  | { status: 'unavailable'; reason: string };

/** Solicita a permissão e captura a posição atual do aparelho assim que a tela abre. */
export const useDeviceLocation = () => {
  const [gps, setGps] = useState<GpsState>({ status: 'loading' });

  const refresh = useCallback(async () => {
    setGps({ status: 'loading' });
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        setGps({ status: 'unavailable', reason: 'Permissão de localização negada' });
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setGps({
        status: 'ok',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    } catch {
      setGps({ status: 'unavailable', reason: 'GPS indisponível no momento' });
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { gps, refresh };
};
