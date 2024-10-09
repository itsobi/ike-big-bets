export const getOdds = async () => {
  // Get the current date and time
  const now = new Date();

  // Calculate the start of the current week (Monday)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(
    now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)
  );
  startOfWeek.setHours(0, 0, 0, 0);

  // Calculate the end of the current week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Format dates to the required format: YYYY-MM-DDTHH:MM:SSZ
  const commenceTimeFrom = startOfWeek.toISOString().slice(0, -5) + 'Z';
  const commenceTimeTo = endOfWeek.toISOString().slice(0, -5) + 'Z';

  const response = await fetch(
    `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${process.env.ODDS_API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american&commenceTimeFrom=${commenceTimeFrom}&commenceTimeTo=${commenceTimeTo}`,
    {
      next: { revalidate: 86400 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch odds');
  }

  const data = (await response.json()) as Game[];
  return data;
};
