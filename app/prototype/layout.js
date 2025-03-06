import '../global.css';

export const metadata = {
  title: 'AIFA EdTech - Prototype',
  description: 'High-tech AI learning platform prototype',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* If you want a single AIFA logo in the layout, put it here:
        <header className="flex justify-center mb-8">
          <img src="/images/AIFAlogo.png" alt="AIFA Logo" className="h-16" />
        </header>
        */}
        {children}
      </body>
    </html>
  );
}
