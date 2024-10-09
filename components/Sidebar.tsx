'use client';

import { cn } from '@/lib/utils';
import { CircleHelp, House, Trophy } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SportsSheetIcon from './SportsDrawerIcon';

const sidebarIcons = [
  {
    iconSmall: House,
    iconLarge: House,
    href: '/dashboard',
    label: 'Home',
  },
  {
    iconSmall: SportsSheetIcon,
    iconLarge: Trophy,
    href: '/sports',
    label: 'Sports',
    removeHref: true,
  },
  {
    iconSmall: CircleHelp,
    iconLarge: CircleHelp,
    href: '/faq',
    label: 'FAQ',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-slate-400 p-2 lg:p-4 min-h-screen border-r border-white space-y-2">
      {sidebarIcons.map((icon) =>
        icon.removeHref ? (
          <div className="flex items-center gap-2 hover:bg-white/60 p-2 rounded-full transition-all duration-300">
            <icon.iconSmall />
            <span className="hidden lg:inline-flex font-semibold">
              {icon.label}
            </span>
          </div>
        ) : (
          <Link
            href={icon.href}
            key={icon.href}
            className={cn(
              'flex items-center gap-2 hover:bg-white/60 p-2 rounded-full transition-all duration-300',
              pathname === icon.href && 'text-white',
              pathname === icon.href && 'hover:bg-transparent'
            )}
          >
            <span className="lg:hidden">
              <icon.iconSmall />
            </span>
            <span className="hidden lg:inline-flex">
              <icon.iconLarge />
            </span>
            <span className="hidden lg:inline-flex font-semibold">
              {icon.label}
            </span>
          </Link>
        )
      )}
    </div>
  );
}
