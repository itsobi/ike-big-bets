import { SignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { ChartNoAxesColumn } from 'lucide-react';

export default function Page() {
  const { userId } = auth();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-100 gap-4">
      {!userId && (
        <div className="flex items-center p-2 bg-black rounded-full">
          <ChartNoAxesColumn className="text-white" />
        </div>
      )}
      <SignIn />
    </div>
  );
}
