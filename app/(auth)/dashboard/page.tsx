import GameCard from '@/components/GameCard';
import { getOdds } from '@/lib/queries';

export default async function DashboardPage() {
  let gameOdds;
  let error = null;

  try {
    gameOdds = await getOdds();
    gameOdds = gameOdds.slice(0, 10);
  } catch (err) {
    error = 'Failed to fetch game odds';
    console.error('Error fetching game odds:', err);
  }

  return (
    <main className="space-y-4">
      {error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : gameOdds ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {gameOdds.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          No game odds available at the moment.
        </div>
      )}
    </main>
  );
}