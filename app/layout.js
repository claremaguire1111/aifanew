// app/layout.js
import './global.css';

export const metadata = {
  title: 'AIFA EdTech',
  description: 'High-tech AI learning platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* No logo here, we rely on each page to add it if needed */}
        {children}
      </body>
    </html>
  );
}

