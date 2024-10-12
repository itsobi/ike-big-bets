'use client';

import { cn } from '@/lib/utils';
import { CircleHelp, House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SportsPopoverIcon from './SportsPopoverIcon';
import SportsDrawerIcon from './SportsDrawerIcon';
import { Fragment } from 'react';

const sidebarItems = [
  {
    icon: House,
    href: '/dashboard',
    label: 'Home',
  },
  {
    icon: SportsPopoverIcon,
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
    <div className="bg-black/95 p-2 lg:p-4 min-h-screen space-y-2 text-slate-600">
      {sidebarItems.map((item) =>
        item.removeHref ? (
          <Fragment key={item.href}>
            <div className="lg:hidden flex items-center gap-2 hover:text-white p-2 rounded-full transition-all duration-300 cursor-pointer">
              <SportsDrawerIcon />
            </div>
            <div
              key={item.href}
              className="hidden lg:inline-flex items-center gap-2 hover:text-white p-2 rounded-full transition-all duration-300 cursor-pointer"
            >
              <SportsPopoverIcon />
            </div>
          </Fragment>
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
              <item.icon />
            </span>
            <span className="hidden lg:inline-flex font-semibold">
              {item.label}
            </span>
          </Link>
        )
      )}
    </div>
  );
}
