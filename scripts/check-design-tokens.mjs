#!/usr/bin/env node
/**
 * Guarda dos tokens do design system.
 *
 * O DESIGN_SYSTEM.md §7 lista regras que até agora dependiam de alguém lembrar
 * na revisão. Este script as torna executáveis: o que estava proibido no papel
 * passa a reprovar a pipeline.
 *
 * Só regras mecânicas entram aqui — "hierarquia visual" continua sendo trabalho
 * de gente. Uso: `node scripts/check-design-tokens.mjs`
 */
import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const PALETAS_GENERICAS =
  'gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';

/** Cada regra: onde procurar, o que é proibido e por quê. */
const REGRAS = [
  {
    nome: 'paleta genérica do Tailwind',
    arquivos: 'src/**/*.tsx',
    padrao: new RegExp(`\\b(bg|text|border|ring|from|to|via)-(${PALETAS_GENERICAS})-\\d{2,3}\\b`),
    porque: 'foge da marca e cria três cinzas diferentes na mesma tela — use a paleta em globals.css',
  },
  {
    nome: 'branco solto',
    arquivos: 'src/**/*.tsx',
    padrao: /\b(text|bg|border)-white\b/,
    porque: 'use `text-on-brand` / `bg-surface`: branco precisa ser um papel nomeado, não um valor',
  },
  {
    nome: 'valor arbitrário',
    arquivos: 'src/**/*.tsx',
    // Só o que a regra combate: medida mágica e cor fora da paleta. Lista de
    // propriedades (`transition-[transform,box-shadow]`) não tem token possível
    // e continua permitida.
    padrao: /\b[a-z-]+-\[[^\]]*(\d+(px|rem|em|vh|vw|%)|#[0-9a-fA-F]{3,8}|rgba?\()[^\]]*\]/,
    porque: 'medida ou cor mágica: se falta um valor, ele vira token no @theme do globals.css',
  },
  {
    nome: 'cor crua',
    arquivos: 'src/**/*.tsx',
    padrao: /#[0-9a-fA-F]{3,8}\b|\brgba?\(/,
    porque: 'cor só existe como token; componente nunca carrega hex',
  },
  {
    nome: 'breakpoint desligado',
    arquivos: 'src/**/*.tsx',
    // Só dentro de string de classe: `sm: 'h-9'` (chave de objeto) não conta.
    padrao: /["'\s](sm|xl|2xl):[a-z[]/,
    porque: 'o projeto tem dois breakpoints, `md:` e `lg:` — os outros estão desligados no @theme',
  },
];

/** Linhas que declaram os próprios tokens não podem violar as regras deles. */
const ISENTOS = [/^src\/app\/globals\.css$/, /^src\/common\/styles\/theme\.ts$/];

const problemas = [];

for (const regra of REGRAS) {
  for (const arquivo of globSync(regra.arquivos)) {
    if (ISENTOS.some((isento) => isento.test(arquivo))) continue;

    const linhas = readFileSync(arquivo, 'utf8').split('\n');
    linhas.forEach((linha, indice) => {
      // Comentário explicando a regra não é violação da regra.
      const semComentario = linha.replace(/\/\/.*$|\/\*.*?\*\//g, '');
      if (regra.padrao.test(semComentario)) {
        problemas.push({
          arquivo,
          linha: indice + 1,
          regra: regra.nome,
          porque: regra.porque,
          trecho: linha.trim().slice(0, 100),
        });
      }
    });
  }
}

if (problemas.length === 0) {
  console.log('✅ Tokens do design system: nenhuma violação.');
  process.exit(0);
}

console.error(`❌ ${problemas.length} violação(ões) dos tokens do design system:\n`);
for (const p of problemas) {
  console.error(`  ${p.arquivo}:${p.linha}  [${p.regra}]`);
  console.error(`    ${p.trecho}`);
  console.error(`    → ${p.porque}\n`);
}
console.error('Regras completas: DESIGN_SYSTEM.md §1 e §7.');
process.exit(1);
