import sportsData from '@/lib/sports.json';

export type Sport = {
  key: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
};

export type SportGroup = {
  label: string;
  sports: Sport[];
};

export const getMoneyLine = (game: Event, teamName: string) => {
  const marketData = game.bookmakers[0].markets.find((m) => m.key === 'h2h');

  if (!marketData) return 'n/a';

  const moneyLine = marketData.outcomes.find((o) => o.name === teamName)?.price;

  if (!moneyLine) return 'n/a';

  return moneyLine;
};

export const getSpread = (game: Event, teamName: string) => {
  const marketData = game.bookmakers[0].markets.find(
    (m) => m.key === 'spreads'
  );

  if (!marketData) return 'n/a';

  const spread = marketData.outcomes.find((o) => o.name === teamName)?.point;
  const price = marketData.outcomes.find((o) => o.name === teamName)?.price;

  if (!spread || !price) return 'n/a';
  return { spread, price };
};

export const getOverUnder = (game: Event) => {
  const marketData = game.bookmakers[0].markets.find((m) => m.key === 'totals');

  if (!marketData) return 'n/a';

  const overOutcome = marketData.outcomes.find((o) => o.name === 'Over');
  const underOutcome = marketData.outcomes.find((o) => o.name === 'Under');

  if (!overOutcome || !underOutcome) return 'n/a';

  return {
    over: overOutcome.point,
    overPrice: overOutcome.price,
    under: underOutcome.point,
    underPrice: underOutcome.price,
  };
};

export const formatLocalTimeShort = (utcTimeString: string): string => {
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

export const formatLocalTime = (utcTimeString: string): string => {
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

export const getSports = () => {
  const groups = sportsData.reduce<SportGroup[]>((acc, sport) => {
    const groupName = acc.find((group) => group.label === sport.group);
    if (groupName) {
      groupName.sports.push(sport);
    } else {
      acc.push({ label: sport.group, sports: [sport] });
    }
    return acc;
  }, []);

  // Sort sports within each group alphabetically by title
  groups.forEach((group) => {
    group.sports.sort((a, b) => a.title.localeCompare(b.title));
  });

  return groups;
};
