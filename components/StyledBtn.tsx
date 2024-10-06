import { Button, ButtonProps } from '@/components/ui/button';
import { forwardRef } from 'react';

export const StyledBtn = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={`font-thin lg:text-lg hover:bg-slate-700 ${className}`}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

StyledBtn.displayName = 'StyledButton';
