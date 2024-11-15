import Link from 'next/link';

import { getBookmakerLogo } from '@/lib/getBookmakerLogo';
import {
  formatLocalTime,
  formatLocalTimeShort,
  getMoneyLine,
  getOverUnder,
  getSpread,
} from '@/lib/helpers';
import { getNflShortName } from '@/lib/mappings';

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
export default function GameCard({ event }: { event: Event }) {
  const homeTeamSpread = getSpread(event, event.home_team);
  const awayTeamSpread = getSpread(event, event.away_team);
  const overUnder = getOverUnder(event);
  const moneyLineHome = getMoneyLine(event, event.home_team);
  const moneyLineAway = getMoneyLine(event, event.away_team);

  const bookmakerName = event.bookmakers[0].title;

  return (
    <>
      {/* Mobile */}
      <Link
        href={`/event/${event.id}`}
        className="lg:hidden bg-slate-300/90 rounded text-slate-600 shadow-md relative hover:bg-slate-400/50 cursor-pointer"
      >
        <div className="absolute top-1 right-1">
          {getBookmakerLogo(bookmakerName)}
        </div>
        <div className="flex">
          <div className="p-2 border-r border-slate-600 space-y-1">
            <div className="border border-black px-2 text-slate-600 w-fit rounded-full text-xs">
              <p>{formatLocalTimeShort(event.commence_time)}</p>
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
                {getNflShortName(event.home_team)}
              </h4>
              <div className="space-y-1">
                <MoneyLine data={moneyLineHome} />
                <SpreadTotal data={homeTeamSpread} />
                <OverUnder data={overUnder} />
              </div>
            </div>
          </div>
          <div className="p-2 border-r flex-1 text-center">
            <div className="flex flex-col space-y-1">
              <h4 className="font-semibold">
                {getNflShortName(event.away_team)}
              </h4>
              <div className="space-y-1">
                <MoneyLine data={moneyLineAway} />
                <SpreadTotal data={awayTeamSpread} />
                <OverUnder data={overUnder} />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Bigger screens */}
      <Link
        href={`/event/${event.id}`}
        className="hidden lg:inline-grid bg-slate-300/90 rounded text-slate-600 shadow-md hover:bg-slate-400/50 cursor-pointer"
      >
        <div className="flex">
          <div className="flex-1 p-2 border-r border-slate-600">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-center">
                <div className="border border-black rounded-full text-white text-xs w-fit px-2 py-1">
                  <p className="hidden lg:inline-block text-slate-600">
                    {formatLocalTime(event.commence_time)}
                  </p>
                </div>
                {getBookmakerLogo(bookmakerName)}
              </div>

              <h4 className="hidden lg:inline-block text-lg font-semibold text-slate-600">
                {event.home_team}
              </h4>
              <h4 className="hidden lg:inline-block text-lg font-semibold text-slate-600">
                {event.away_team}
              </h4>
            </div>
          </div>
          <div className="flex">
            <div className="p-2 border-r border-slate-600 text-center">
              <div className="flex flex-col space-y-2 text-white/80 font-semibold">
                <p className="text-slate-600">Money Line</p>
                <MoneyLine data={moneyLineHome} />
                <MoneyLine data={moneyLineAway} />
              </div>
            </div>
            <div className="p-2 border-r border-slate-600 text-center w-[100px]">
              <div className="flex flex-col space-y-2 text-white/80 font-semibold">
                <p className="text-slate-600">Spread</p>
                <SpreadTotal data={homeTeamSpread} />
                <SpreadTotal data={awayTeamSpread} />
              </div>
            </div>
            <div className="flex flex-col items-center p-2 text-center">
              <div className="space-y-2 text-white/80 font-semibold">
                <p className="text-slate-600">Over/Under</p>
                <OverUnder data={overUnder} />
                <OverUnder data={overUnder} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
