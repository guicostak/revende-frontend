import type { Metadata } from 'next';
import './globals.css';
import { jsonLdGraph, organizationJsonLd, websiteJsonLd } from '@/common/utils';
import { Footer, Navbar } from '@/components/layout';
import { JsonLd } from '@/components/seo';
import { Container } from '@/components/ui';
import { SITE } from '@/config';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  // Necessário para o Next resolver URL absoluta em canonical e Open Graph.
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    template: SITE.titleTemplate,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    title: SITE.defaultTitle,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.defaultTitle,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col bg-surface-muted/40">
        <JsonLd data={jsonLdGraph(organizationJsonLd(), websiteJsonLd())} />
        <AuthProvider>
          <Navbar />
          <Container as="main" className="flex-1 py-8">
            {children}
          </Container>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
