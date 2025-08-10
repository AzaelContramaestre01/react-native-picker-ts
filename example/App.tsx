import 'react-native-gesture-handler';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { YearPicker, MonthYearPicker, DualPicker, DatePicker } from 'react-native-picker-js';
import REGIONES_COMUNAS from './data/chile';

type Mode = 'year' | 'month-year' | 'dual' | 'date';

export default function App() {
  const [mode, setMode] = useState<Mode>('year');
  const [singleYear, setSingleYear] = useState<string | null>(null);
  const [dualDate, setDualDate] = useState<Date | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [comuna, setComuna] = useState<string | null>(null);
  const [fullDate, setFullDate] = useState<Date | null>(null);

  const regiones = useMemo(() => Object.keys(REGIONES_COMUNAS), []);
  const comunasByRegion = REGIONES_COMUNAS as Record<string, string[]>;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1, padding: 16, gap: 24, justifyContent: 'center' }}>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <Text style={{ marginBottom: 12, fontWeight: '700' }}>Preview mode</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {(['year', 'month-year', 'dual', 'date'] as Mode[]).map((m) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setMode(m)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: mode === m ? '#007aff' : '#ccc',
                    backgroundColor: mode === m ? '#e6f0ff' : '#fff',
                  }}
                >
                  <Text>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {mode === 'year' && (
              <>
                <Text style={{ marginBottom: 8 }}>Selected year: {singleYear ?? 'none'}</Text>
                <YearPicker
                  minimum={2015}
                  maximum={2025}
                  renderTrigger={({ open, displayText }) => (
                    <View style={{ width: '100%' }}>
                      <Text style={{ fontSize: 12, color: '#374151', marginBottom: 6, fontWeight: '600' }}>
                        Año(*)
                      </Text>
                      <TouchableOpacity
                        onPress={open}
                        activeOpacity={0.8}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderWidth: 1,
                          borderColor: '#d1d5db',
                          backgroundColor: '#fff',
                          paddingHorizontal: 14,
                          paddingVertical: 12,
                          borderRadius: 8,
                          height: 40,
                        }}
                      >
                        <Text style={{ color: '#111827', fontSize: 14 }}>
                          {displayText || 'Selecciona año'}
                        </Text>
                        <View style={{ width: 10, height: 10, borderRightWidth: 2, borderBottomWidth: 2, borderColor: '#6b7280', transform: [{ rotate: '45deg' }] }} />
                      </TouchableOpacity>
                    </View>
                  )}
                  onSelect={({ selectedYear }) => setSingleYear(selectedYear ?? null)}
                />
              </>
            )}

            {mode === 'month-year' && (
              <>
                <Text style={{ marginBottom: 8 }}>Selected date: {dualDate?.toISOString() ?? 'none'}</Text>
                <MonthYearPicker
                  minimum={2015}
                  maximum={2025}
                  renderTrigger={({ open, displayText }) => (
                    <View style={{ width: '100%' }}>
                      <Text style={{ fontSize: 12, color: '#374151', marginBottom: 6, fontWeight: '600' }}>Mes y año</Text>
                      <TouchableOpacity
                        onPress={open}
                        activeOpacity={0.8}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderWidth: 1,
                          borderColor: '#d1d5db',
                          backgroundColor: '#fff',
                          paddingHorizontal: 14,
                          paddingVertical: 12,
                          borderRadius: 8,
                          height: 40,
                        }}
                      >
                        <Text style={{ color: '#111827', fontSize: 14 }}>{displayText || 'Selecciona mes y año'}</Text>
                        <View style={{ width: 10, height: 10, borderRightWidth: 2, borderBottomWidth: 2, borderColor: '#6b7280', transform: [{ rotate: '45deg' }] }} />
                      </TouchableOpacity>
                    </View>
                  )}
                  onSelect={(v) => setDualDate(v)}
                />
              </>
            )}

            {mode === 'dual' && (
              <>
                <Text style={{ marginBottom: 8 }}>Selected: {region ?? '—'} {region && ' / '} {comuna ?? '—'}</Text>
                <DualPicker
                  placeholder="Selecciona región / comuna"
                  leftItems={regiones}
                  getRightItems={(left) => (left ? comunasByRegion[left] ?? [] : [])}
                  selectedLeft={region}
                  selectedRight={comuna}
                  renderTrigger={({ open, displayText, disabled }) => (
                    <View style={{ width: '100%' }}>
                      <Text style={{ fontSize: 12, color: '#374151', marginBottom: 6, fontWeight: '600' }}>Región(*)</Text>
                      <TouchableOpacity
                        onPress={open}
                        activeOpacity={0.8}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderWidth: 1,
                          borderColor: '#d1d5db',
                          backgroundColor: '#fff',
                          paddingHorizontal: 14,
                          paddingVertical: 12,
                          borderRadius: 8,
                          height: 40,
                        }}
                      >
                        <Text style={{ color: '#111827', fontSize: 14 }}>
                          {displayText || 'Selecciona región / comuna'}
                        </Text>
                        <View style={{ width: 10, height: 10, borderRightWidth: 2, borderBottomWidth: 2, borderColor: '#6b7280', transform: [{ rotate: '45deg' }] }} />
                      </TouchableOpacity>
                    </View>
                  )}
                  onSelect={(v) => {
                    if (typeof v === 'object' && v !== null && 'left' in v) {
                      const { left, right } = v as { left: string | null; right?: string | null };
                      setRegion(left ?? null);
                      setComuna(right ?? null);
                    }
                  }}
                />
              </>
            )}

            {mode === 'date' && (
              <>
                <Text style={{ marginBottom: 8 }}>Selected date: {fullDate?.toDateString() ?? 'none'}</Text>
                <DatePicker
                  minimumYear={2015}
                  maximumYear={2025}
                  onSelect={(d) => setFullDate(d)}
                  renderTrigger={({ open }) => (
                    <View style={{ width: '100%' }}>
                      <Text style={{ fontSize: 12, color: '#374151', marginBottom: 6, fontWeight: '600' }}>Fecha</Text>
                      <TouchableOpacity
                        onPress={open}
                        activeOpacity={0.8}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderWidth: 1,
                          borderColor: '#d1d5db',
                          backgroundColor: '#fff',
                          paddingHorizontal: 14,
                          paddingVertical: 12,
                          borderRadius: 8,
                          height: 40,
                        }}
                      >
                        <Text style={{ color: '#111827', fontSize: 14 }}>
                          {fullDate
                            ? `${fullDate.getFullYear()}/${String(fullDate.getMonth() + 1).padStart(2, '0')}/${String(fullDate.getDate()).padStart(2, '0')}`
                            : 'Selecciona fecha'}
                        </Text>
                        <View style={{ width: 10, height: 10, borderRightWidth: 2, borderBottomWidth: 2, borderColor: '#6b7280', transform: [{ rotate: '45deg' }] }} />
                      </TouchableOpacity>
                    </View>
                  )}
                  renderFooterActions={({ onCancel, onConfirm }) => (
                    <View style={{ width: '100%', paddingHorizontal: 40, marginVertical: 10 }}>
                      <TouchableOpacity
                        onPress={onConfirm}
                        style={{ backgroundColor: '#e50914', paddingVertical: 12, borderRadius: 24, alignItems: 'center' }}
                      >
                        <Text style={{ color: 'white', fontWeight: '700' }}>Seleccionar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={onCancel} style={{ marginTop: 12, alignItems: 'center' }}>
                        <Text style={{ color: '#e50914' }}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}


