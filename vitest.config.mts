import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/**
 * Configuração dos testes unitários.
 *
 * `resolve.tsconfigPaths` reaproveita o alias `@/` do tsconfig — sem ele, cada
 * import teria que virar caminho relativo só nos testes.
 */
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      // `lcov` alimenta o SonarCloud; `text` imprime o resumo no log da pipeline.
      reporter: ['text', 'lcov', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{ts,tsx}',
        // Composição de UI e metadata: sem lógica própria para exercitar.
        'src/app/**/{page,layout,not-found,robots,sitemap}.tsx',
        'src/app/**/{robots,sitemap}.ts',
        'src/types/**',
        'src/**/index.ts',
      ],
    },
  },
});
