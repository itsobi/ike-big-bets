import { House, Trophy } from 'lucide-react';
import Link from 'next/link';

const sidebarIcons = [
  {
    icon: House,
    href: '/home',
    label: 'Home',
  },
  {
    icon: Trophy,
    href: '/sports',
    label: 'Sports',
  },
];

export default function Sidebar() {
  return (
    <div className="bg-slate-400 p-2 h-screen border-r border-white">
      {sidebarIcons.map((icon) => (
        <Link
          href={icon.href}
          key={icon.href}
          className="flex items-center gap-2 mb-2 hover:bg-white p-2 rounded-full transition-all duration-300"
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
