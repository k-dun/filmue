import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Filmue = Film + Clue",
  description: "Are you a true movie buff? Test yourself daily and get your streak up!",
  keywords: ["movie quiz", "daily movie quiz", "film trivia", "wordle for movies", "game like wordle"],
  authors: [
    {
      name: "kdun",
      url: "https://kdun.dev",
    }
  ],
  openGraph: {
    type: "website",
    url: "https://filmue.com",
    title: "Filmue = Film + Clue",
    description: "Are you a true movie buff? Test yourself daily and get your streak up!",
    images: [
      {
        url: "https://www.filmue.com/filmue-meta-image.png",
        width: 1200,
        height: 630,
        alt: "Filmue = Film + Clue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kdun_dev",
    title: "Filmue = Film + Clue",
    description: "Are you really a movie buff? Test yourself daily and get your streak up!",
    images: ["https://www.filmue.com/filmue-meta-image.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#FCFAFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
