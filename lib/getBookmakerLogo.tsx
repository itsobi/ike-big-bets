import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import betMgm from '@/public/images/betMGM.png';
import betOnline from '@/public/images/betOnline.png';
import betUs from '@/public/images/betUs.jpg';
import bovada from '@/public/images/bovada.png';
import caesars from '@/public/images/caesars.png';
import draftKings from '@/public/images/draftKings.png';
import fanduel from '@/public/images/fanduel.png';
import myBookie from '@/public/images/myBookie.png';
import Image from 'next/image';

export const getBookmakerLogo = (bookmakerName: string) => {
  switch (bookmakerName) {
    case 'DraftKings':
      return (
        <div className="w-6 h-6 rounded-full flex items-center justify-center">
          <Image
            src={draftKings}
            alt="Draft Kings"
            className="w-full h-full object-contain"
          />
        </div>
      );
    case 'Caesars':
      return (
        <div className="w-6 h-6 rounded-full flex items-center justify-center">
          <Image
            src={caesars}
            alt="Caesars"
            className="w-full h-full object-contain"
          />
        </div>
      );
    case 'BetUS':
      return (
        <div className="w-6 h-6 rounded-full flex items-center justify-center">
          <Image
            src={betUs}
            alt="BetUS"
            className="w-full h-full object-contain"
          />
        </div>
      );
    case 'FanDuel':
      return (
        <div className="w-6 h-6 rounded-full flex items-center justify-center">
          <Image
            src={fanduel}
            alt="Fan Duel"
            className="w-full h-full object-contain"
          />
        </div>
      );
    case 'BetOnline.ag':
      return (
        <div className="w-6 h-6 rounded-full flex items-center justify-center">
          <Image
            src={betOnline}
            alt="BetOnline.ag"
            className="w-full h-full object-contain"
          />
        </div>
      );
    case 'MyBookie.ag':
      return (
        <div className="w-6 h-6 rounded-full flex items-center justify-center">
          <Image
            src={myBookie}
            alt="MyBookie.ag"
            className="w-full h-full object-contain"
          />
        </div>
      );
    case 'BetMGM':
      return (
        <div className="w-6 h-6 rounded-full flex items-center justify-center">
          <Image
            src={betMgm}
            alt="BetMGM"
            className="w-full h-full object-contain"
          />
        </div>
      );
    case 'Bovada':
      return (
        <div className="w-6 h-6 rounded-full flex items-center justify-center">
          <Image
            src={bovada}
            alt="Bovada"
            className="w-full h-full object-contain"
          />
        </div>
      );
    default:
      return (
        <HoverCard>
          <HoverCardTrigger className="hover:underline cursor-pointer">
            {bookmakerName.charAt(0)}
          </HoverCardTrigger>
          <HoverCardContent className="w-fit bg-black/95 text-white">
            {bookmakerName}
          </HoverCardContent>
        </HoverCard>
      );
  }
};
