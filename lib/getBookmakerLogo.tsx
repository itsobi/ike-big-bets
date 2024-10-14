'use client';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import betMgm from '@/public/images/betMGM.png';
import betOnline from '@/public/images/betOnline.jpg';
import betUs from '@/public/images/betUS.jpeg';
import bovada from '@/public/images/bovada.png';
import caesars from '@/public/images/caesars.jpeg';
import draftKings from '@/public/images/draftKings.png';
import fanduel from '@/public/images/fanduel.jpg';
import myBookie from '@/public/images/myBookie.png';
import Image from 'next/image';

export const getBookmakerLogo = (bookmakerName: string) => {
  const logoWrapper = (src: any, alt: string) => (
    <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={24}
        height={24}
        className="object-contain"
      />
    </div>
  );

  switch (bookmakerName) {
    case 'DraftKings':
      return logoWrapper(draftKings, 'Draft Kings');
    case 'Caesars':
      return logoWrapper(caesars, 'Caesars');
    case 'BetUS':
      return logoWrapper(betUs, 'BetUS');
    case 'FanDuel':
      return logoWrapper(fanduel, 'Fan Duel');
    case 'BetOnline.ag':
      return logoWrapper(betOnline, 'BetOnline.ag');
    case 'MyBookie.ag':
      return logoWrapper(myBookie, 'MyBookie.ag');
    case 'BetMGM':
      return logoWrapper(betMgm, 'BetMGM');
    case 'Bovada':
      return logoWrapper(bovada, 'Bovada');
    default:
      return (
        <HoverCard>
          <HoverCardTrigger className="hover:underline">
            {bookmakerName.charAt(0)}
          </HoverCardTrigger>
          <HoverCardContent className="w-fit bg-black/95 text-white">
            {bookmakerName}
          </HoverCardContent>
        </HoverCard>
      );
  }
};
