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
    <header className="flex items-center py-4 px-4 lg:px-12 bg-slate-400 border-b border-white">
      <div className="flex-1">
        <p className="text-2xl font-semibold">
          Welcome, <span className="text-white">{name}</span>
        </p>
      </div>

      <UserButton />
    </header>
  );
}
