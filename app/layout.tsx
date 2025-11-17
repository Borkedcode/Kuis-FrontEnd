import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Quiz React Praktikum',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-light">{children}</body>
    </html>
  );
}