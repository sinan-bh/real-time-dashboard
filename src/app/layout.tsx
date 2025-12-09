import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Real Time Tracker",
  description:
    "A real-time dashboard to monitor user activities and system performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
