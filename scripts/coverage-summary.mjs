#!/usr/bin/env node
/**
 * Tabela de cobertura para o painel do GitHub Actions.
 *
 * Vive em arquivo, e não inline no workflow, porque script embutido em YAML
 * escapa mal e o shellcheck do actionlint reclama de expansão em aspas simples.
 *
 * Uso: `node scripts/coverage-summary.mjs` (depois de `npm run test:coverage`)
 */
import { readFileSync } from 'node:fs';

const CAMINHO = 'coverage/coverage-summary.json';
const METRICAS = [
  ['lines', 'Linhas'],
  ['statements', 'Instruções'],
  ['functions', 'Funções'],
  ['branches', 'Ramos'],
];

let total;
try {
  total = JSON.parse(readFileSync(CAMINHO, 'utf8')).total;
} catch {
  console.log('Nenhum relatório de cobertura encontrado.');
  process.exit(0);
}

console.log('| Métrica | % | Coberto |');
console.log('|---|---|---|');
for (const [chave, rotulo] of METRICAS) {
  const m = total[chave];
  console.log(`| ${rotulo} | ${m.pct}% | ${m.covered}/${m.total} |`);
}
