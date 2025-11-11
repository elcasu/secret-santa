import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Secret Santa",
  description: "Simple Secret Santa app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main className="min-h-screen bg-gray-50 text-gray-900">
          <div className="max-w-3xl mx-auto p-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
