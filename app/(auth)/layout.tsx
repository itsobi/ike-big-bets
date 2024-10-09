import Header from '@/components/Header';
import '../../app/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Ike's Big Bets",
  description:
    'Make smarter bets with real-time odds, detailed game insights, and live score updates. Bet better, win more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  auth().protect();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-gradient-to-br from-slate-300 from-10% via-slate-400 via-60% to-slate-500 to-100%">
            <div className="flex">
              <Sidebar />
              <div className="w-full p-4">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
