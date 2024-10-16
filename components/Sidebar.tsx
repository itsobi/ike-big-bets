'use client';

import { cn } from '@/lib/utils';
import { CircleHelp, House, Trophy } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SportsPopoverIcon from './SportsPopoverIcon';

export const sidebarItems = [
  {
    icon: House,
    href: '/dashboard',
    label: 'Home',
  },
  {
    icon: Trophy,
    href: '/sports',
    label: 'Sports',
    removeHref: true,
  },
  {
    icon: CircleHelp,
    href: '/faq',
    label: 'FAQ',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex flex-col bg-black/95 p-2 lg:p-4 min-h-screen space-y-2 text-slate-600">
      {sidebarItems.map((item) =>
        item.removeHref ? (
          <div
            key={item.href}
            className="items-center gap-2 hover:text-white p-2 rounded-full transition-all duration-300 cursor-pointer"
          >
            <SportsPopoverIcon />
          </div>
        ) : (
          <Link
            href={item.href}
            key={item.href}
            className={cn(
              'flex items-center gap-2 hover:bg-black hover:text-white p-2 rounded-full transition-all duration-300',
              pathname === item.href && 'text-white',
              pathname === item.href && 'hover:bg-transparent'
            )}
          >
            <span>
              <item.icon className="w-6 h-6" />
            </span>
            <span className="font-semibold">{item.label}</span>
          </Link>
        )
      )}
    </div>
  );
}
