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
      under?: undefined;
      underPrice?: undefined;
    }
  | {
      under: number | undefined;
      underPrice: number | undefined;
      over?: undefined;
      overPrice?: undefined;
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
  if (data === 'n/a') return <p className="text-black">n/a</p>;

  return <p className="text-green-300">{data}</p>;
}

function SpreadTotal({ data }: SpreadProps) {
  if (data === 'n/a') return <p className="text-black">n/a</p>;

  const { spread, price } = data;

  return (
    <p>
      {spread} <span className="text-green-300">{price}</span>
    </p>
  );
}

function OverUnder({ data }: OverUnderProps) {
  if (data === 'n/a') return <p className="text-black">n/a</p>;

  const { over, overPrice, under, underPrice } = data;

  return (
    <p>
      {over || under}{' '}
      <span className="text-green-300">{overPrice || underPrice}</span>
    </p>
  );
}
export default function GameCard({ game }: { game: Game }) {
  const homeTeamSpread = getSpread(game, game.home_team);
  const awayTeamSpread = getSpread(game, game.away_team);
  const overUnder = getOverUnder(game, game.home_team);
  const moneyLineHome = getMoneyLine(game, game.home_team);
  const moneyLineAway = getMoneyLine(game, game.away_team);
  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden border rounded text-slate-600">
        <div className="flex">
          <div className="p-2 border-r space-y-1">
            <div className="border px-2 text-white w-fit rounded-full text-xs">
              <p>{formatLocalTimeShort(game.commence_time)}</p>
            </div>
            <div className="space-y-2">
              <h4>Money Line</h4>
              <h4>Spread</h4>
              <h4>Over/Under</h4>
            </div>
          </div>
          <div className="p-2 border-r flex-1 text-center">
            <div className="flex flex-col space-y-1">
              <h4 className="font-semibold">
                {getNflShortName(game.home_team)}
              </h4>
              <div className="text-white/80 space-y-1">
                <MoneyLine data={moneyLineHome} />
                <SpreadTotal data={homeTeamSpread} />
                <OverUnder data={overUnder} />
              </div>
            </div>
          </div>
          <div className="p-2 border-r flex-1 text-center">
            <div className="flex flex-col space-y-1">
              <h4 className="font-semibold">
                {getNflShortName(game.away_team)}
              </h4>
              <div className="text-white/80 space-y-1">
                <MoneyLine data={moneyLineAway} />
                <SpreadTotal data={awayTeamSpread} />
                <OverUnder data={overUnder} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bigger screens */}
      <div className="hidden lg:inline-grid border rounded text-slate-600">
        <div className="flex">
          <div className="flex-1 p-2 border-r">
            <div className="flex flex-col space-y-1">
              <div className="border rounded-full text-white text-xs w-fit px-2 py-1">
                <p className="hidden lg:inline-block">
                  {formatLocalTime(game.commence_time)}
                </p>
              </div>

              <h4 className="hidden lg:inline-block text-lg font-semibold text-slate-900">
                {game.home_team}
              </h4>
              <h4 className="hidden lg:inline-block text-lg font-semibold text-slate-900">
                {game.away_team}
              </h4>
            </div>
          </div>
          <div className="w-[300px] flex">
            <div className="p-2 border-r text-center">
              <div className="flex flex-col space-y-2 text-white/80 font-semibold">
                <p className="text-slate-600">Money Line</p>
                <MoneyLine data={moneyLineHome} />
                <MoneyLine data={moneyLineAway} />
              </div>
            </div>
            <div className="p-2 border-r text-center">
              <div className="flex flex-col space-y-2 text-white/80 font-semibold">
                <p className="text-slate-600">Spread</p>
                <SpreadTotal data={homeTeamSpread} />
                <SpreadTotal data={awayTeamSpread} />
              </div>
            </div>
            <div className="p-2 text-center">
              <div className="flex flex-col space-y-2 text-white/80 font-semibold">
                <p className="text-slate-600">Over/Under</p>
                <OverUnder data={overUnder} />
                <OverUnder data={overUnder} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
