import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['preview/preview.ts'],
  outDir: 'public',
  noExternal: ['react', 'react-dom', '@emotion/react', '@uniformdev/canvas'],
  platform: 'browser',
  tsconfig: 'preview/tsconfig.json',
});
