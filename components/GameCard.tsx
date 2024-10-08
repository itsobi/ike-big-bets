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

import { getOddsForTeam } from '@/lib/helpers';
import { getNflShortName } from '@/lib/mappings';

const formatLocalTimeShort = (utcTimeString: string): string => {
  const date = new Date(utcTimeString);

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString();

  return `${month}/${day}/${year} - ${formattedHours}:${minutes}${ampm}`;
};

const formatLocalTime = (utcTimeString: string): string => {
  const date = new Date(utcTimeString);
  return date
    .toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace('at', '-');
};

export default function GameCard({ game }: { game: Game }) {
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
                <p>{getOddsForTeam(game, 'h2h', game.home_team)}</p>
                <p>{getOddsForTeam(game, 'spreads', game.home_team)}</p>
                <p>{getOddsForTeam(game, 'totals', game.home_team)}</p>
              </div>
            </div>
          </div>
          <div className="p-2 border-r flex-1 text-center">
            <div className="flex flex-col space-y-1">
              <h4 className="font-semibold">
                {getNflShortName(game.away_team)}
              </h4>
              <div className="text-white/80 space-y-1">
                <p>{getOddsForTeam(game, 'h2h', game.away_team)}</p>
                <p>{getOddsForTeam(game, 'spreads', game.away_team)}</p>
                <p>{getOddsForTeam(game, 'totals', game.away_team)}</p>
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

              <h4 className="hidden lg:inline-block text-lg font-semibold">
                {game.home_team}
              </h4>
              <h4 className="hidden lg:inline-block text-lg font-semibold">
                {game.away_team}
              </h4>
            </div>
          </div>
          <div className="p-2 border-r text-center">
            <div className="flex flex-col space-y-2 text-white/80 font-semibold">
              <p className="text-slate-600">Money Line</p>
              <p>{getOddsForTeam(game, 'h2h', game.home_team)}</p>
              <p>{getOddsForTeam(game, 'h2h', game.away_team)}</p>
            </div>
          </div>
          <div className="p-2 border-r text-center">
            <div className="flex flex-col space-y-2 text-white/80 font-semibold">
              <p className="text-slate-600">Spread</p>
              <p>{getOddsForTeam(game, 'spreads', game.home_team)}</p>
              <p>{getOddsForTeam(game, 'spreads', game.away_team)}</p>
            </div>
          </div>
          <div className="p-2 text-center">
            <div className="flex flex-col space-y-2 text-white/80 font-semibold">
              <p className="text-slate-600">Over/Under</p>
              <p>{getOddsForTeam(game, 'totals', game.home_team)}</p>
              <p>{getOddsForTeam(game, 'totals', game.away_team)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
