'use client';

import { Trophy } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

import { getSports } from '@/lib/helpers';
import { getIcon } from './SportsDrawerIcon';

export default function SportsPopoverIcon() {
  const sportsGroups = getSports();
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2">
        <Trophy />
        <span className="font-semibold">Sports</span>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        className="z-50 ml-7 mt-20 bg-black/90 border-none grid grid-cols-2 w-[500px] max-h-[500px] overflow-auto scrollbar-hidden"
      >
        {sportsGroups.map((group) => (
          <div key={group.label} className="p-4 cursor-pointer">
            <div className="flex items-center gap-2 text-lg font-semibold text-white/90">
              <span className="">{getIcon(group.label)}</span>
              <span>{group.label}</span>
            </div>

            {group.sports.map((sport) => (
              <p
                key={sport.title}
                className="p-2 text-white/90 hover:underline"
              >
                {sport.title}
              </p>
            ))}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
