'use client';

import { cn } from '@/lib/utils';
import { CircleHelp, House, Trophy } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarIcons = [
  {
    icon: House,
    href: '/dashboard',
    label: 'Home',
  },
  {
    icon: Trophy,
    href: '/sports',
    label: 'Sports',
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
    <div className="bg-slate-400 p-2 lg:p-4 min-h-screen border-r border-white">
      {sidebarIcons.map((icon) => (
        <Link
          href={icon.href}
          key={icon.href}
          className={cn(
            'flex items-center gap-2 mb-2 hover:bg-white/60 p-2 rounded-full transition-all duration-300',
            pathname === icon.href && 'text-white',
            pathname === icon.href && 'hover:bg-transparent'
          )}
        >
          <icon.icon />
          <span className="hidden lg:inline-flex font-semibold">
            {icon.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
