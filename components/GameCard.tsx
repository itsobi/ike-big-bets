'use client';

import { getBookmakerLogo } from '@/lib/getBookmakerLogo';
import {
  formatLocalTime,
  formatLocalTimeShort,
  getMoneyLine,
  getOverUnder,
  getSpread,
} from '@/lib/helpers';
import { getNflShortName } from '@/lib/mappings';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';

type MoneyLineProps = {
  data: 'n/a' | number;
};

type SpreadProps = {
  data:
    | 'n/a'
    | {
        spread: number;
        price: number;
      };
};

type OverUnderData =
  | 'n/a'
  | {
      over: number | undefined;
      overPrice: number;
      under: number | undefined;
      underPrice: number;
    };

type OverUnderProps = {
  data: OverUnderData;
};

/*
DraftKings
Caesars
BetUS
FanDuel
MyBookie.ag
LowVig.ag
BetOnline.ag
BetMGM
BetRivers
Bovada
*/

function MoneyLine({ data }: MoneyLineProps) {
  if (data === 'n/a') return <p className="text-slate-600">n/a</p>;

  return <p className="text-green-500">{data}</p>;
}

function SpreadTotal({ data }: SpreadProps) {
  if (data === 'n/a') return <p className="text-slate-600">n/a</p>;

  const { spread, price } = data;

  return (
    <p>
      <span className="text-slate-600">{spread}</span>{' '}
      <span className="text-green-500">{price}</span>
    </p>
  );
}

function OverUnder({ data }: OverUnderProps) {
  if (data === 'n/a') return <p className="text-slate-600">n/a</p>;

  const { over, overPrice, under, underPrice } = data;

  return (
    <p>
      <span className="text-slate-600 mr-1">{over || under}</span>
      <span className="text-green-500">{overPrice || underPrice}</span>
    </p>
  );
}
export default function GameCard({ game }: { game: Game }) {
  const [randomIndex, setRandomIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const homeTeamSpread = getSpread(game, game.home_team, randomIndex);
  const awayTeamSpread = getSpread(game, game.away_team, randomIndex);
  const overUnder = getOverUnder(game, randomIndex);
  const moneyLineHome = getMoneyLine(game, game.home_team, randomIndex);
  const moneyLineAway = getMoneyLine(game, game.away_team, randomIndex);

  const bookmakerName = game.bookmakers[randomIndex].title;

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * game.bookmakers.length));
    setIsLoading(false);
  }, [game.bookmakers.length]);

  return (
    <>
      {/* Mobile */}
      <Link
        href={`/event/${game.id}`}
        className="lg:hidden bg-slate-300/90 rounded text-slate-600 shadow-md relative hover:bg-slate-400/50"
      >
        <div className="absolute top-1 right-1">
          {isLoading ? (
            <Skeleton className="h-6 w-6 rounded-full bg-slate-400" />
          ) : (
            getBookmakerLogo(bookmakerName)
          )}
        </div>
        <div className="flex">
          <div className="p-2 border-r border-slate-600 space-y-1">
            <div className="border border-black px-2 text-slate-600 w-fit rounded-full text-xs">
              <p>{formatLocalTimeShort(game.commence_time)}</p>
            </div>
            <div className="space-y-2">
              <h4>Money Line</h4>
              <h4>Spread</h4>
              <h4>Over/Under</h4>
            </div>
          </div>
          <div className="p-2 border-r border-slate-600 flex-1 text-center">
            <div className="flex flex-col space-y-1">
              <h4 className="font-semibold">
                {getNflShortName(game.home_team)}
              </h4>
              <div className="space-y-1">
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 w-full bg-slate-400" />
                    <Skeleton className="h-4 w-full bg-slate-400" />
                    <Skeleton className="h-4 w-full bg-slate-400" />
                  </>
                ) : (
                  <>
                    <MoneyLine data={moneyLineHome} />
                    <SpreadTotal data={homeTeamSpread} />
                    <OverUnder data={overUnder} />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="p-2 border-r flex-1 text-center">
            <div className="flex flex-col space-y-1">
              <h4 className="font-semibold">
                {getNflShortName(game.away_team)}
              </h4>
              <div className="space-y-1">
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 w-full bg-slate-400" />
                    <Skeleton className="h-4 w-full bg-slate-400" />
                    <Skeleton className="h-4 w-full bg-slate-400" />
                  </>
                ) : (
                  <>
                    <MoneyLine data={moneyLineAway} />
                    <SpreadTotal data={awayTeamSpread} />
                    <OverUnder data={overUnder} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Bigger screens */}
      <Link
        href={`/event/${game.id}`}
        className="hidden lg:inline-grid bg-slate-300/90 rounded text-slate-600 shadow-md hover:bg-slate-400/50"
      >
        <div className="flex">
          <div className="flex-1 p-2 border-r border-slate-600">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-center">
                <div className="border border-black rounded-full text-white text-xs w-fit px-2 py-1">
                  <p className="hidden lg:inline-block text-slate-600">
                    {formatLocalTime(game.commence_time)}
                  </p>
                </div>
                {isLoading ? (
                  <Skeleton className="h-6 w-6 rounded-full bg-slate-400" />
                ) : (
                  getBookmakerLogo(bookmakerName)
                )}
              </div>

              <h4 className="hidden lg:inline-block text-lg font-semibold text-slate-600">
                {game.home_team}
              </h4>
              <h4 className="hidden lg:inline-block text-lg font-semibold text-slate-600">
                {game.away_team}
              </h4>
            </div>
          </div>
          <div className="flex">
            <div className="p-2 border-r border-slate-600 text-center">
              <div className="flex flex-col space-y-2 text-white/80 font-semibold">
                <p className="text-slate-600">Money Line</p>
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 w-full bg-slate-400" />
                    <Skeleton className="h-4 w-full bg-slate-400" />
                  </>
                ) : (
                  <>
                    <MoneyLine data={moneyLineHome} />
                    <MoneyLine data={moneyLineAway} />
                  </>
                )}
              </div>
            </div>
            <div className="p-2 border-r border-slate-600 text-center w-[100px]">
              <div className="flex flex-col space-y-2 text-white/80 font-semibold">
                <p className="text-slate-600">Spread</p>
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 w-full bg-slate-400" />
                    <Skeleton className="h-4 w-full bg-slate-400" />
                  </>
                ) : (
                  <>
                    <SpreadTotal data={homeTeamSpread} />
                    <SpreadTotal data={awayTeamSpread} />
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center p-2 text-center">
              <div className="space-y-2 text-white/80 font-semibold">
                <p className="text-slate-600">Over/Under</p>
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 w-full bg-slate-400" />
                    <Skeleton className="h-4 w-full bg-slate-400" />
                  </>
                ) : (
                  <>
                    <OverUnder data={overUnder} />
                    <OverUnder data={overUnder} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
