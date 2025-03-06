// app/profile/layout.js
import '../global.css';
import './profile.css';

export const metadata = {
  title: 'Profile',
};

export default function ProfileLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <header className="mb-8 flex justify-center">
          <img src="/images/AIFAlogo.png" alt="AIFA Logo" className="h-16" />
        </header>
        {children}
      </body>
    </html>
  );
}
