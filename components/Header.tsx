import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { Loader } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default async function Header() {
  const user = await currentUser();

  const name =
    user?.firstName ||
    user?.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;

  return (
    <header className="flex items-center py-4 px-4 lg:px-12 bg-black/95 border-none">
      <div className="lg:hidden flex-1">
        <MobileMenu />
      </div>
      <div className="hidden lg:flex flex-1">
        <p className="text-2xl font-semibold text-slate-600">
          Welcome, <span className="text-white/90">{name}</span>
        </p>
      </div>

      <ClerkLoading>
        <Loader className="text-slate-600 animate-spin" size={16} />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton />
      </ClerkLoaded>
    </header>
  );
}
