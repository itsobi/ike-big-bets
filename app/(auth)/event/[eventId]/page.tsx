'use client';

import { selectedEventAtom } from '@/atoms';
import { useAtom } from 'jotai';

export default function EventPage({ params }: { params: { eventId: string } }) {
  const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);

  return <div>event id {params.eventId}</div>;
}
