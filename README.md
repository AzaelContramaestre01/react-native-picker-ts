## react-native-picker-js

Lightweight, animated wheel pickers for React Native (TypeScript, pure JS). Includes ready-to-use pickers for year, month+year, generic lists, dual lists (e.g., región/comuna), and a DatePicker (day/month/year).

### Install

```bash
npm install react-native-picker-js
# or
yarn add react-native-picker-js
```

Peer dependencies (install in your app):
- react (>=18.2 <20)
- react-native (^0.74)
- react-native-reanimated (^3.10)
- react-native-gesture-handler (^2.12)

### Setup

1) Babel plugin for Reanimated

```js
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

2) Gesture Handler top-level import and RootView

```tsx
// index.js or App.tsx
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* ... */}
    </GestureHandlerRootView>
  );
}
```

### Quick start

```tsx
import { YearPicker, MonthYearPicker, ListPicker, DualPicker, DatePicker } from 'react-native-picker-js';

// Year only
<YearPicker minimum={2015} maximum={2025} onSelect={({ selectedYear }) => { /* string|null */ }} />

// Month + Year → returns Date (first day of month)
<MonthYearPicker minimum={2015} maximum={2025} onSelect={(d) => { /* Date */ }} />

// Generic single list → string
<ListPicker items={["One", "Two", "Three"]} onSelect={(v) => { /* string */ }} />

// Dual list (e.g., Región / Comuna) → { left, right }
<DualPicker
  leftItems={["Ñuble", "Biobío"]}
  getRightItems={(left) => left === 'Ñuble' ? ['San Carlos', 'Chillán'] : ['Concepción']}
  onSelect={({ left, right }) => { /* strings|null */ }}
/>

// Full DatePicker (Day / Month / Year) → Date
<DatePicker minimumYear={2015} maximumYear={2025} onSelect={(d) => { /* Date */ }} />
```

### Components and returned types

- YearPicker
  - onSelect: ({ selectedYear: string | null }) => void
  - props: minimum, maximum, plus Common props

- MonthYearPicker
  - onSelect: (date: Date) => void
  - props: minimum, maximum, plus Common props

- ListPicker
  - onSelect: (value: string) => void
  - props: items, selected, plus Common props

- DualPicker
  - onSelect: ({ left: string | null, right: string | null }) => void
  - props: leftItems, rightItems?, getRightItems?(left) → string[], selectedLeft?, selectedRight?, plus Common props

- DatePicker
  - onSelect: (date: Date) => void
  - props: minimumYear, maximumYear, initialDate?, locale?, plus Common props

Common props (available in all pickers):
- placeholder?: string
- disabled?: boolean
- renderCalendarIcon?: React.ReactNode
- renderClearIcon?: React.ReactNode
- containerStyle?: ViewStyle
- textStyle?: TextStyle
- iconContainerStyle?: ViewStyle
- actionButtonsPosition?: 'top' | 'bottom'
- leftActionButtonText?: string
- rightActionButtonText?: string
- showCleaner?: boolean
- renderFooterActions?: ({ onCancel, onConfirm }) => React.ReactNode (override footer)

### Example app (Expo)

This repo includes an `example/` Expo app wired to the local package.

```bash
# from repo root
npm install
cd example && npm install && cd ..
npm run dev:example
```

The script runs the library watch build and Expo dev server. Edit code in `src/` and the example hot-reloads.

### Use in your app (bare RN or Expo)

1) Install deps and follow Setup above (Reanimated plugin + Gesture Handler RootView)

2) Import a picker and render it where needed

```tsx
import { DualPicker } from 'react-native-picker-js';

const REGIONES: string[] = ['Valparaíso', 'Ñuble', 'Metropolitana'];
const COMUNAS: Record<string, string[]> = {
  Valparaíso: ['Papudo', 'Zapallar', 'Los Andes'],
  'Ñuble': ['San Carlos', 'Chillán', 'Ninhue'],
  Metropolitana: ['Santiago', 'Puente Alto', 'Maipú'],
};

<DualPicker
  placeholder="Selecciona comuna"
  leftItems={REGIONES}
  getRightItems={(left) => (left ? COMUNAS[left] ?? [] : [])}
  onSelect={({ left, right }) => {
    // left/right are strings or null
  }}
/>;
```

3) Optional: customize footer actions (replace default Cancel/Select)

```tsx
<DatePicker
  minimumYear={2015}
  maximumYear={2028}
  renderFooterActions={({ onCancel, onConfirm }) => (
    <View style={{ width: '100%', paddingHorizontal: 40, marginVertical: 10 }}>
      <TouchableOpacity onPress={onConfirm} style={{ backgroundColor: '#e50914', paddingVertical: 12, borderRadius: 24, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Seleccionar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel} style={{ marginTop: 12, alignItems: 'center' }}>
        <Text style={{ color: '#e50914' }}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  )}
  onSelect={(d) => {/* Date result */}}
/>
```

### Data expectations (JSON shapes)

- ListPicker
  - items: string[]
  - onSelect: (value: string)

- DualPicker
  - leftItems: string[]
  - Provide either:
    - rightItems: string[] (static), or
    - getRightItems: (left: string | null) => string[] (dependent)
  - onSelect: ({ left: string | null, right: string | null })

- MonthYearPicker
  - minimum, maximum: numbers (year bounds)
  - onSelect: (date: Date)

- DatePicker
  - minimumYear, maximumYear: numbers
  - onSelect: (date: Date)

Common customization
- placeholder, disabled
- icons: renderCalendarIcon, renderClearIcon
- styles: containerStyle, textStyle, iconContainerStyle
- actions: actionButtonsPosition, leftActionButtonText, rightActionButtonText, showCleaner, renderFooterActions

### Local testing in another app

Option A – tarball install (recommended for RN)
```bash
# in this repo
npm run build
npm pack   # produces react-native-picker-js-<version>.tgz

# in your target app
npm install ../path/to/react-native-picker-js-<version>.tgz
```

Option B – file path dependency
```json
// in your app's package.json
{
  "dependencies": {
    "react-native-picker-js": "file:../react-native-picker-js"
  }
}
```
Then run install and rebuild the app. Avoid classic npm/yarn link in RN (Metro can misresolve symlinks).

### Scripts / CI

```bash
npm run build         # build CJS/ESM + types
npm run typecheck     # tsc --noEmit
npm run lint          # eslint .
npm publish           # prepublishOnly hooks: build + typecheck
```

### License

MIT


