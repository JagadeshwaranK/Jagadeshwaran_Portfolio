import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Jagadeshwaran K — Associate Software Engineer',
  description: 'Jagadeshwaran builds clear, dependable digital products with React, TypeScript, and thoughtful engineering.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#f3f5f0" />
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {`(() => {
            let saved = null;
            try { saved = localStorage.getItem('portfolio-theme'); } catch {}
            const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
            const dark = saved ? saved === 'dark' : systemDark;
            document.documentElement.classList.toggle('dark', dark);
            document.documentElement.classList.add('theme-ready');
            const color = document.querySelector('meta[name="theme-color"]');
            if (color) color.content = dark ? '#101714' : '#f3f5f0';
          })();`}
        </Script>
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
