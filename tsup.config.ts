import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  outExtension: ({ format }) => ({ js: format === 'esm' ? '.esm.js' : '.cjs.js' }),
  external: [
    'react',
    'react-native',
    'react-native-reanimated',
    'react-native-gesture-handler',
  ],
  minify: false,
});


