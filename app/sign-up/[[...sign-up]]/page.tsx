import { SignUp } from '@clerk/nextjs';
import { ChartNoAxesColumn } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-100 gap-4">
      <div className="flex items-center p-2 bg-black rounded-full">
        <ChartNoAxesColumn className="text-white" />
      </div>
      <SignUp />
    </div>
  );
}
