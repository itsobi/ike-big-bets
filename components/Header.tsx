import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export default async function Header() {
  const user = await currentUser();

  const name =
    user?.firstName ||
    user?.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;

  return (
    <header className="flex items-center py-4 px-4 lg:px-12 bg-black/95 border-none">
      <div className="flex-1">
        <p className="text-2xl font-semibold text-slate-600">
          Welcome, <span className="text-white/90">{name}</span>
        </p>
      </div>

      <UserButton />
    </header>
  );
}
