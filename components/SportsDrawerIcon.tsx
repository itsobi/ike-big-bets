'use client';

import { ArrowLeft, ChevronRight, Trophy } from 'lucide-react';

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

export default function SportsSheetIcon() {
  const [sportLabel, setSportLabel] = useState<string | undefined>(undefined);
  const sportsGroups = getSports();
  return (
    <Sheet>
      <SheetTrigger>
        <Trophy />
      </SheetTrigger>
      <SheetContent
        side={'right'}
        className="p-0 bg-black/95 overflow-auto border-none"
      >
        <div className="p-6 flex items-center space-x-2">
          {sportLabel && (
            <ArrowLeft
              onClick={() => setSportLabel(undefined)}
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
      </SheetContent>
    </Sheet>
  );
}
