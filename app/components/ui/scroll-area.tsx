// Create ScrollArea.tsx in the correct path (e.g., src/components/ui/ScrollArea.tsx)
import { ReactNode } from 'react';

type ScrollAreaProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollArea({ children, className = '' }: ScrollAreaProps) {
  return (
    <div className={`overflow-y-auto ${className}`} style={{ maxHeight: '100%' }}>
      {children}
    </div>
  );
}
