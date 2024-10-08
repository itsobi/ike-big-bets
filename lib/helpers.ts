type MarketEnum = 'h2h' | 'spreads' | 'totals';

export const getOddsForTeam = (
  game: Game,
  market: MarketEnum,
  teamName: string
) => {
  const marketData = game.bookmakers[0].markets.find((m) => m.key === market);

  if (!marketData) return 'n/a';

  if (market === 'spreads') {
    const point = marketData.outcomes.find((o) => o.name === teamName)?.point;
    const price = marketData.outcomes.find((o) => o.name === teamName)?.price;

    if (!price || !point) return 'n/a';
    return `${point} ${price}`;
  }

  if (market === 'totals') {
    if (game.home_team === teamName) {
      const overOutcome = marketData.outcomes.find((o) => o.name === 'Over');
      const overPrice = overOutcome?.price;
      const overPoint = overOutcome?.point;

      if (!overOutcome) return 'n/a';
      return `${overPoint} ${overPrice}`;
    }
    const underOutcome = marketData.outcomes.find((o) => o.name === 'Under');
    const underPrice = underOutcome?.price;
    const underPoint = underOutcome?.point;

    if (!underOutcome) return 'n/a';
    return `${underPoint} ${underPrice}`;
  }

  const odds = marketData.outcomes.find((o) => o.name === teamName)?.price;

  if (!odds) return 'n/a odds';

  return odds;
};
