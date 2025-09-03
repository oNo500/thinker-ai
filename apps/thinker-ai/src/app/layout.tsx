import '@/styles/index.css';

import { AppProviders } from '@/components/providers';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ThinkerAI',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/782fa124dcc01bb095ba97f0290dde2b?family=Alibaba-PuHuiTi-M"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: "Alibaba-PuHuiTi-M";
              src: url("https://db.onlinewebfonts.com/t/782fa124dcc01bb095ba97f0290dde2b.eot");
              src: url("https://db.onlinewebfonts.com/t/782fa124dcc01bb095ba97f0290dde2b.eot?#iefix")format("embedded-opentype"),
              url("https://db.onlinewebfonts.com/t/782fa124dcc01bb095ba97f0290dde2b.woff2")format("woff2"),
              url("https://db.onlinewebfonts.com/t/782fa124dcc01bb095ba97f0290dde2b.woff")format("woff"),
              url("https://db.onlinewebfonts.com/t/782fa124dcc01bb095ba97f0290dde2b.ttf")format("truetype"),
              url("https://db.onlinewebfonts.com/t/782fa124dcc01bb095ba97f0290dde2b.svg#Alibaba-PuHuiTi-M")format("svg");
            }
          `,
          }}
        />
      </head>
      <body className={`antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
