import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Ocorrencia } from '../types';
import { RISK_COLORS } from '../utils/occurrence';

interface VegetationMapProps {
  occurrences: Ocorrencia[];
  onSelectOccurrence: (occurrence: Ocorrencia) => void;
}

const createMapHtml = (occurrences: Ocorrencia[]) => {
  const points = occurrences.map((occurrence) => ({
    id: occurrence.id,
    latitude: Number(occurrence.latitude),
    longitude: Number(occurrence.longitude),
    color: RISK_COLORS[occurrence.risco],
  }));
  const serializedPoints = JSON.stringify(points).replace(/</g, '\\u003c');

  return `<!doctype html>
  <html lang="pt-BR">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        html, body, #map { height: 100%; width: 100%; margin: 0; background: #25352c; }
        .leaflet-tile-pane { filter: brightness(.72) saturate(.72) sepia(.08); }
        .leaflet-control-attribution { font: 9px system-ui, sans-serif; background: rgba(8,17,12,.76) !important; color: #cbd5e1; }
        .leaflet-control-attribution a { color: #86efac; }
        .leaflet-control-zoom a { background: #102017; color: #f8fafc; border-color: #36503f; }
        .vegetation-marker {
          width: 38px; height: 38px; border-radius: 50%; border: 3px solid #f8fafc;
          box-sizing: border-box; display: grid; place-items: center;
          box-shadow: 0 4px 10px rgba(0,0,0,.45);
        }
        .vegetation-marker::after {
          content: ''; width: 12px; height: 17px; background: white;
          border-radius: 100% 0 100% 0; transform: rotate(-25deg);
        }
      </style>
    </head>
    <body>
      <div id="map" aria-label="Mapa interativo das ocorrências de vegetação"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        const points = ${serializedPoints};
        const map = L.map('map', { zoomControl: false, attributionControl: true, preferCanvas: true })
          .setView([-23.54, -47.04], 9);
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        points.forEach((point) => {
          const icon = L.divIcon({
            className: '',
            html: '<div class="vegetation-marker" style="background:' + point.color + '"></div>',
            iconSize: [38, 38],
            iconAnchor: [19, 19]
          });
          L.marker([point.latitude, point.longitude], { icon })
            .addTo(map)
            .on('click', () => window.ReactNativeWebView.postMessage(point.id));
        });

        setTimeout(() => {
          map.invalidateSize();
          if (points.length > 1) {
            map.fitBounds(points.map((point) => [point.latitude, point.longitude]), {
              paddingTopLeft: [36, 230],
              paddingBottomRight: [36, 150],
              maxZoom: 11
            });
          } else if (points.length === 1) {
            map.setView([points[0].latitude, points[0].longitude], 12);
          }
        }, 350);
      </script>
    </body>
  </html>`;
};

export const VegetationMap = ({ occurrences, onSelectOccurrence }: VegetationMapProps) => {
  const html = useMemo(() => createMapHtml(occurrences), [occurrences]);
  const handleMessage = ({ nativeEvent }: WebViewMessageEvent) => {
    const occurrence = occurrences.find((item) => item.id === nativeEvent.data);
    if (occurrence) onSelectOccurrence(occurrence);
  };

  return (
    <View style={styles.container}>
      <WebView
        style={styles.map}
        source={{ html }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        onMessage={handleMessage}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#4ADE80" />
          </View>
        )}
        setSupportMultipleWindows={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#25352C' },
  map: { flex: 1, backgroundColor: '#25352C' },
  loading: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25352C',
  },
});
