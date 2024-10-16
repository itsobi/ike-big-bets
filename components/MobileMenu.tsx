'use client';

import {
  ArrowLeft,
  ChevronRight,
  CircleHelp,
  Home,
  Menu,
  Trophy,
} from 'lucide-react';

import {
  FaBasketballBall,
  FaBaseballBall,
  FaFootballBall,
  FaVolleyballBall,
  FaGlobeAmericas,
  FaHockeyPuck,
} from 'react-icons/fa';
import { IoGolf } from 'react-icons/io5';
import { MdOutlineSportsMartialArts, MdSportsCricket } from 'react-icons/md';
import { GiBoxingGlove, GiSoccerBall } from 'react-icons/gi';
import { IoMdTennisball } from 'react-icons/io';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { useState } from 'react';
import { getSports } from '@/lib/helpers';
import { Button } from './ui/button';
import { sidebarItems } from './Sidebar';
import { useRouter } from 'next/navigation';

export const getIcon = (sportLabel: string) => {
  switch (sportLabel) {
    case 'American Football':
      return <FaFootballBall />;
    case 'Baseball':
      return <FaBaseballBall />;
    case 'Basketball':
      return <FaBasketballBall />;
    case 'Boxing':
      return <GiBoxingGlove />;
    case 'Cricket':
      return <MdSportsCricket />;
    case 'Golf':
      return <IoGolf />;
    case 'Ice Hockey':
      return <FaHockeyPuck />;
    case 'Mixed Martial Arts':
      return <MdOutlineSportsMartialArts />;
    case 'Politics':
      return <FaGlobeAmericas />;
    case 'Soccer':
      return <GiSoccerBall />;
    case 'Tennis':
      return <IoMdTennisball />;
    case 'Volleyball':
      return <FaVolleyballBall />;
    case 'Water Polo':
      return <FaHockeyPuck />;
    default:
      return null;
  }
};

export default function MobileMenu() {
  const router = useRouter();
  const [sportLabel, setSportLabel] = useState<string | undefined>(undefined);
  const [showSports, setShowSports] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sportsGroups = getSports();

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const handleSportsOptions = () => {
    if (sportLabel) {
      setSportLabel(undefined);
    } else {
      setShowSports(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu className="text-slate-600" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className="p-0 bg-black/90 overflow-auto border-none"
      >
        {showSports ? (
          <>
            <div className="p-6 flex items-center space-x-2">
              {showSports && (
                <ArrowLeft
                  onClick={handleSportsOptions}
                  className="cursor-pointer text-white/90"
                />
              )}
              <h4 className="font-semibold text-xl text-white/90">Sports</h4>
            </div>
            {sportLabel ? (
              <div className="pt-2">
                <h6 className="font-semibold text-center mb-2 text-white/90">
                  {sportLabel}
                </h6>

                {sportsGroups
                  .find((group) => group.label === sportLabel)
                  ?.sports.map((sport) => (
                    <div
                      key={sport.title}
                      className="flex justify-between items-center border-b p-4 cursor-pointer font-semibold text-white/90 hover:bg-white hover:text-black"
                    >
                      {sport.title}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="pt-2">
                {sportsGroups.map((group) => (
                  <div
                    key={group.label}
                    onClick={() => setSportLabel(group.label)}
                    className="flex items-center border-b p-4 cursor-pointer text-white/90 hover:bg-white hover:text-black"
                  >
                    <div className="flex-1 flex items-center gap-2 font-semibold">
                      {getIcon(group.label)}
                      {group.label}
                    </div>
                    <ChevronRight />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div
              onClick={() => handleNavigation('/dashboard')}
              className="flex items-center border-b gap-2 p-4 cursor-pointer text-white/90 hover:bg-white hover:text-black w-full"
            >
              <Home />
              <span>Home</span>
            </div>
            <div
              onClick={() => setShowSports(true)}
              className="flex items-center border-b gap-2 p-4 cursor-pointer text-white/90 hover:bg-white hover:text-black w-full"
            >
              <Trophy />
              <span>Sports</span>
            </div>
            <div
              onClick={() => handleNavigation('/faq')}
              className="flex items-center border-b gap-2 p-4 cursor-pointer text-white/90 hover:bg-white hover:text-black w-full"
            >
              <CircleHelp />
              <span>FAQs</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
