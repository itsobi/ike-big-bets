'use client';

import { ArrowLeft, ChevronRight, Trophy } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import sportsData from '@/lib/sports.json';
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

type Sport = {
  key: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
};

type SportGroup = {
  label: string;
  sports: Sport[];
};

const sportsGroups = sportsData.reduce<SportGroup[]>((acc, sport) => {
  const groupName = acc.find((group) => group.label === sport.group);
  if (groupName) {
    groupName.sports.push(sport);
  } else {
    acc.push({ label: sport.group, sports: [sport] });
  }
  return acc;
}, []);

// Sort sports within each group alphabetically by title
sportsGroups.forEach((group) => {
  group.sports.sort((a, b) => a.title.localeCompare(b.title));
});

const getIcon = (sportLabel: string) => {
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

console.log(sportsGroups);

export default function SportsSheetIcon() {
  const [sportLabel, setSportLabel] = useState<string | undefined>(undefined);
  return (
    <Sheet>
      <SheetTrigger>
        <Trophy />
      </SheetTrigger>
      <SheetContent side={'right'} className="p-0 bg-slate-200 overflow-auto ">
        <div className="p-6 flex items-center space-x-2">
          {sportLabel && (
            <ArrowLeft
              onClick={() => setSportLabel(undefined)}
              className="cursor-pointer"
            />
          )}
          <h4 className="font-semibold text-xl">Sports</h4>
        </div>
        {sportLabel ? (
          <div className="pt-2">
            <h6 className="font-semibold text-center mb-2">{sportLabel}</h6>

            {sportsGroups
              .find((group) => group.label === sportLabel)
              ?.sports.map((sport) => (
                <div
                  key={sport.title}
                  className="flex justify-between items-center border-b p-4 cursor-pointer hover:bg-slate-300"
                >
                  {sport.title}
                </div>
              ))}
          </div>
        ) : (
          <div className="pt-2">
            {sportsGroups.map((group) => (
              <div
                onClick={() => setSportLabel(group.label)}
                key={group.label}
                className="flex items-center border-b p-4 cursor-pointer hover:bg-slate-300"
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
