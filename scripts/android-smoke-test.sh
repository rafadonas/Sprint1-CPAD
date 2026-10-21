#!/usr/bin/env bash
# Instala o APK em um emulador, percorre o fluxo principal e salva capturas de tela.
set -euo pipefail

APK="${1:-motiva-verde.apk}"
PACKAGE="br.com.fiap.motivaverde"
OUT="screenshots"
mkdir -p "$OUT"

shot() { adb exec-out screencap -p > "$OUT/$1.png"; }

tap_text() {
  adb shell uiautomator dump /sdcard/ui.xml > /dev/null
  adb pull /sdcard/ui.xml "$OUT/ui.xml" > /dev/null
  local bounds
  bounds=$(grep -o "text=\"$1\"[^>]*bounds=\"[^\"]*\"" "$OUT/ui.xml" | head -1 | grep -o 'bounds="[^"]*"' | grep -o '[0-9]\+' | tr '\n' ' ')
  if [ -z "$bounds" ]; then
    bounds=$(grep -o "content-desc=\"$1\"[^>]*bounds=\"[^\"]*\"" "$OUT/ui.xml" | head -1 | grep -o 'bounds="[^"]*"' | grep -o '[0-9]\+' | tr '\n' ' ')
  fi
  read -r x1 y1 x2 y2 <<< "$bounds"
  adb shell input tap $(( (x1 + x2) / 2 )) $(( (y1 + y2) / 2 ))
}

alive() {
  adb shell pidof "$PACKAGE" > /dev/null || { echo "App encerrou inesperadamente"; exit 1; }
}

adb install -r "$APK"
adb shell pm grant "$PACKAGE" android.permission.ACCESS_FINE_LOCATION
adb shell pm grant "$PACKAGE" android.permission.ACCESS_COARSE_LOCATION
adb shell pm grant "$PACKAGE" android.permission.CAMERA
adb shell monkey -p "$PACKAGE" -c android.intent.category.LAUNCHER 1
sleep 25
alive
shot 01-mapa

tap_text "Nova ocorrência"
sleep 6
alive
shot 02-formulario

adb shell input keyevent 4
sleep 3
alive
shot 03-voltar-mapa

tap_text "Histórico"
sleep 4
alive
shot 04-historico

adb shell input keyevent 4
sleep 3
alive
shot 05-voltar-historico

tap_text "Perfil"
sleep 4
alive
shot 06-perfil

adb logcat -d -s ReactNativeJS:V AndroidRuntime:E > "$OUT/logcat.txt" || true
if grep -q "FATAL EXCEPTION" "$OUT/logcat.txt"; then
  echo "Falha fatal encontrada no logcat"
  exit 1
fi
echo "Smoke test concluído"
