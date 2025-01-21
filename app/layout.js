// app/layout.js
import "./global.css"; // Here is your custom font + other global rules

export const metadata = {
  title: "AIFA",
  description: "Future Of Film",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
