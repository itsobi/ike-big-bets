import Image from 'next/image';
import betImage from '../public/images/betImage.jpeg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { StyledBtn } from '@/components/StyledBtn';

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-br from-slate-200 from-10% via-slate-400 via-60% to-slate-800 to-100%">
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto w-full px-4 xl:px-0 gap-4 pt-10">
        <div className="flex flex-col justify-center items-center text-center gap-4">
          <h1 className="text-4xl lg:text-6xl font-bold">
            Smart Bets, <span className="text-white">Live Results</span>
          </h1>
          <p className="text-lg text-slate-600">
            Make smarter bets with real-time odds, detailed game insights, and
            live score updates.{' '}
            <span className="text-white font-medium">
              Bet better, win more.
            </span>
          </p>
          <StyledBtn className="font-thin lg:text-lg hover:bg-slate-700">
            <Link href="/sign-in">Get Started</Link>
          </StyledBtn>
        </div>

        <div className="flex justify-center">
          <Image src={betImage} alt="betImage" className="rounded-lg" />
        </div>
      </div>
    </main>
  );
}
