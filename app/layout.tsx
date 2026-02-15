import type { Metadata } from "next";

// This metadata helps with SEO and how the tab looks in the browser
export const metadata: Metadata = {
  title: "Histovic PDF Pro",
  description: "Secure, local-first PDF tools by Histovic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#020617' }}>
        {children}
      </body>
    </html>
  );
}