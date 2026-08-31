/**
 * Injeta um bloco JSON-LD no HTML.
 *
 * Server Component de propósito: o schema precisa estar no HTML da primeira
 * resposta, não depois da hidratação — crawler de IA não executa JavaScript.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // O conteúdo vem dos nossos próprios builders, nunca do usuário.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
