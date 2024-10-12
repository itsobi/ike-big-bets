import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: 'What is money line betting?',
    answer:
      "Money line betting is a type of sports betting where you bet on the outcome of a game. You can bet on the favorite or the underdog, and the odds are displayed in a money line format. For instance, let's say the Dallas Cowboys are playing the New York Giants, and you think the Cowboys will win. In this case, you'd place a money line wager on the Cowboys. If the Cowboys win the game, you win. If they lose, you lose",
  },
  {
    question: 'How do I read money line odds?',
    answer:
      'To understand how to read money line odds, you first need to understand the concept of the favorite and the underdog. The favored team will have a “-” before the odds, whereas the underdog will have a “+”. The money line odds represent the amount you need to bet to win $100. For example, if the Dallas Cowboys are playing the New York Giants, and the Cowboys are -275 favorites, you would need to bet $275 to win $100. If the Giants are +200 underdogs, a $100 bet would net you a $200 profit if they were to win.',
  },
  {
    question: 'What is the point spread?',
    answer:
      'A handicap set by odds makers to even the playing field between two teams. The favored team must win by more than the spread (a specific number of points) for a bet on them to win, while the underdog can lose by fewer points than the spread or win outright for a bet on them to be successful. Let’s say the Dallas Cowboys are playing the New York Giants, and the point spread is Cowboys -7.5 and Giants +7.5. If you bet on the Cowboys, they need to win by 8 or more points for you to win the bet. If you bet on the Giants, they can either win the game or lose by 7 points or less for you to win the bet.',
  },
];

export default function NeedToKnowsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-600">Need-to-Knows</h1>
      <Accordion
        type="single"
        collapsible
        className="w-full text-slate-600 mt-4"
      >
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
