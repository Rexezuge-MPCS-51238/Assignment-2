import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { RecipeProvider } from "@/lib/recipe-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe Book",
  description: "Your personal recipe collection — save, search, and cook your favorites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <RecipeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-amber-100 bg-white py-6 text-center text-sm text-zinc-400">
            Recipe Book — Data lives in memory only. Refresh to reset.
          </footer>
        </RecipeProvider>
      </body>
    </html>
  );
}
