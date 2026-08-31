#!/usr/bin/env node
/**
 * Orçamento do JavaScript compartilhado.
 *
 * Mede o "First Load JS shared by all" — os chunks que toda página carrega
 * antes de qualquer coisa aparecer. É o número que mais mexe com LCP e INP,
 * e o que uma dependência nova infla sem ninguém perceber.
 *
 * Falha a pipeline quando o orçamento estoura, para a regressão aparecer no PR
 * em vez de no Search Console três semanas depois.
 * Ver `docs/seo/performance-e-web-vitals.md`.
 *
 * Uso: `node scripts/check-bundle-budget.mjs` (depois de `npm run build`)
 */
import { gzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Teto em KB do JS compartilhado, comprimido — que é como ele trafega.
 * Subir este número é uma decisão explícita, não um efeito colateral de PR.
 */
const ORCAMENTO_KB = 120;

const NEXT_DIR = '.next';

let manifesto;
try {
  manifesto = JSON.parse(readFileSync(join(NEXT_DIR, 'build-manifest.json'), 'utf8'));
} catch {
  console.error(`❌ ${NEXT_DIR}/build-manifest.json não encontrado. Rode \`npm run build\` antes.`);
  process.exit(1);
}

const arquivos = manifesto.rootMainFiles ?? [];
if (arquivos.length === 0) {
  console.error('❌ O manifesto não lista chunks compartilhados. O build ficou incompleto?');
  process.exit(1);
}

let total = 0;
const detalhe = arquivos.map((arquivo) => {
  const bytes = gzipSync(readFileSync(join(NEXT_DIR, arquivo))).length;
  total += bytes;
  return { arquivo, kb: bytes / 1024 };
});

const totalKb = total / 1024;
const kb = (valor) => `${valor.toFixed(1)} KB`;

for (const { arquivo, kb: tamanho } of detalhe.sort((a, b) => b.kb - a.kb)) {
  console.log(`  ${kb(tamanho).padStart(9)}  ${arquivo}`);
}
console.log(`  ${'─'.repeat(9)}`);
console.log(`  ${kb(totalKb).padStart(9)}  total (gzip), orçamento ${ORCAMENTO_KB} KB\n`);

// Exporta para o resumo da pipeline, quando rodando no GitHub Actions.
if (process.env.GITHUB_OUTPUT) {
  const fs = await import('node:fs');
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `bundle_kb=${totalKb.toFixed(1)}\nbundle_budget_kb=${ORCAMENTO_KB}\n`,
  );
}

if (totalKb > ORCAMENTO_KB) {
  console.error(
    `❌ JS compartilhado em ${kb(totalKb)}, acima do orçamento de ${ORCAMENTO_KB} KB.\n` +
      '   Ou a dependência nova sai, ou ela entra por `next/dynamic`, ou o orçamento\n' +
      '   sobe de propósito — editando ORCAMENTO_KB neste arquivo, com justificativa.',
  );
  process.exit(1);
}

console.log(`✅ JS compartilhado dentro do orçamento (${kb(totalKb)} / ${ORCAMENTO_KB} KB).`);
