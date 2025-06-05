// app/layout.js
import './global.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'AIFA | A positive future for entertainment',
  description: 'AIFA London is developing educational tools and resources to help you create the films you have always envisioned.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/AIFAlogo.png" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

