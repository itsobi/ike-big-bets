import Header from '@/components/Header';
import '../../app/globals.css';
import { auth } from '@clerk/nextjs/server';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';
import { JotaiProvider } from '@/components/JotaiProvider';
import { UserButton } from '@clerk/nextjs';

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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="min-h-screen bg-slate-200">
        <div className="flex">
          <Sidebar />
          <div className="w-full p-4">{children}</div>
        </div>
      </main>
      <footer className="bg-black/95 flex flex-col gap-2.5 items-end text-slate-600 p-4">
        <p className="">&copy; Ike's Big Bets 2024</p>
        <p className="text-xs">
          developed by:{' '}
          <a
            href="https://justobii.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:underline underline-offset-2"
          >
            justobii.com
          </a>
        </p>
      </footer>
    </div>
  );
}
