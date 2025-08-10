### react-native-picker-js

Lightweight, animated wheel pickers for React Native (TypeScript, pure JS).

[![npm version](https://img.shields.io/npm/v/react-native-picker-js.svg?label=npm%20version)](https://www.npmjs.com/package/react-native-picker-js) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

### 🎬 Showcase

| Single (Year) | Dual (Region/Commune) | Triple (Example) |
| --- | --- | --- |
| ![Single](https://raw.githubusercontent.com/AzaelContramaestre01/react-native-picker-ts/main/src/assets/gif/SINGLE-PICKER.gif) | ![Dual](https://raw.githubusercontent.com/AzaelContramaestre01/react-native-picker-ts/main/src/assets/gif/DUAL-PICKER.gif) | ![Triple](https://raw.githubusercontent.com/AzaelContramaestre01/react-native-picker-ts/main/src/assets/gif/TRIAL-PICKER.gif) |

### 📦 Installation

```bash
npm install react-native-picker-ts
# or
yarn add react-native-picker-ts
```

Peer dependencies (install in your app):
- react (>=18.2 <20)
- react-native (^0.74)
- react-native-reanimated (^3.10)
- react-native-gesture-handler (^2.12)

### 🛠️ Setup

1) Add Reanimated Babel plugin

```js
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

2) Import Gesture Handler at the top-level and wrap your app

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

### ⚡ Quick Start

```tsx
import { YearPicker, MonthYearPicker, ListPicker, DualPicker, DatePicker } from 'react-native-picker-js';

// Year only → { selectedYear: string | null }
<YearPicker minimum={2015} maximum={2025} onSelect={({ selectedYear }) => {}} />

// Month + Year → Date (first day of selected month)
<MonthYearPicker minimum={2015} maximum={2025} onSelect={(d) => {}} />

// Generic single list → string
<ListPicker items={["One", "Two", "Three"]} onSelect={(v) => {}} />

// Dual (e.g., Region / Commune) → { left, right }
<DualPicker
  leftItems={["Ñuble", "Biobío"]}
  getRightItems={(left) => (left === 'Ñuble' ? ['San Carlos', 'Chillán'] : ['Concepción'])}
  onSelect={({ left, right }) => {}}
/>

// Full Date (Day / Month / Year) → Date
<DatePicker minimumYear={2015} maximumYear={2025} onSelect={(d) => {}} />
```

### 🧩 Components & Props

Common props (available in all pickers):

| Prop | Type | Description |
| --- | --- | --- |
| `placeholder` | string | Placeholder text in the trigger |
| `disabled` | boolean | Disables the trigger/input |
| `renderCalendarIcon` | React.ReactNode | Custom left icon in trigger |
| `renderClearIcon` | React.ReactNode | Custom right/clear icon in trigger |
| `containerStyle` | ViewStyle | Style for the trigger container |
| `textStyle` | TextStyle | Style for the trigger text |
| `iconContainerStyle` | ViewStyle | Style for the trigger icon wrapper |
| `actionButtonsPosition` | 'top' or 'bottom' | Where to place action buttons |
| `leftActionButtonText` | string | Text for cancel button |
| `rightActionButtonText` | string | Text for confirm button |
| `showCleaner` | boolean | Show a clear button inside the modal |
| `renderFooterActions` | ({ onCancel, onConfirm }) => React.ReactNode | Replace footer actions |
| `renderTrigger` | ({ open, displayText, disabled }) => React.ReactNode | Fully control the input trigger UI |

YearPicker

| Prop | Type | Required |
| --- | --- | --- |
| `minimum` | number | yes |
| `maximum` | number | yes |
| `selectedYear` | string or null | no |
| `onSelect` | ({ selectedYear: string | null }) => void | yes |

MonthYearPicker

| Prop | Type | Required |
| --- | --- | --- |
| `minimum` | number | yes |
| `maximum` | number | yes |
| `selectedDate` | Date or string | no |
| `onSelect` | (value: Date) => void | yes |

ListPicker

| Prop | Type | Required |
| --- | --- | --- |
| `items` | string[] | yes |
| `selected` | string or null | no |
| `onSelect` | (value: string) => void | yes |

DualPicker

| Prop | Type | Required |
| --- | --- | --- |
| `leftItems` | string[] | yes |
| `rightItems` | string[] | no |
| `getRightItems` | (left: string | null) => string[] | no |
| `selectedLeft` | string or null | no |
| `selectedRight` | string or null | no |
| `onSelect` | ({ left: string | null, right: string | null }) => void | yes |

DatePicker

| Prop | Type | Required |
| --- | --- | --- |
| `minimumYear` | number | yes |
| `maximumYear` | number | yes |
| `initialDate` | Date or string | no |
| `locale` | string | no |
| `onSelect` | (value: Date) => void | yes |

### 🎛️ Custom Trigger

Customize the input with `renderTrigger`.

```tsx
<DualPicker
  leftItems={["Valparaíso", "Ñuble"]}
  getRightItems={(left) => (left === 'Ñuble' ? ['San Carlos', 'Chillán'] : ['Papudo'])}
  renderTrigger={({ open, displayText, disabled }) => (
    <TouchableOpacity
      onPress={open}
      disabled={disabled}
      style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        borderWidth: 1, borderColor: '#d1d5db', backgroundColor: '#fff',
        paddingHorizontal: 14, paddingVertical: 12, borderRadius: 8,
      }}
    >
      <Text style={{ color: '#111827' }}>{displayText || 'Select region / commune'}</Text>
      <View style={{ width: 10, height: 10, borderRightWidth: 2, borderBottomWidth: 2, borderColor: '#6b7280', transform: [{ rotate: '45deg' }] }} />
    </TouchableOpacity>
  )}
  onSelect={({ left, right }) => {}}
/>
```

### 📱 Example App (Expo)

An `example/` Expo app is included.

```bash
# from repo root
npm install
cd example && npm install && cd ..
npm run dev:example
```

This runs the library in watch mode and the Expo dev server. Edit `src/` and the example hot-reloads.

### 🧪 Local Testing

- Build once: `npm run build`
- Watch build during development: `npm run dev`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`

### 📄 License

MIT © Azael Contramaestre
