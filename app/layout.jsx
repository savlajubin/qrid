import "../styles/globals.css";

export const metadata = {
  title: "QRido",
  description: "Create, share & embed QR codes"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
