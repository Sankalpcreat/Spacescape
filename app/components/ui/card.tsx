import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`p-4 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: CardProps) {
  return <div className="mb-4">{children}</div>;
}

export function CardTitle({ children }: CardProps) {
  return <h3 className="text-lg font-bold">{children}</h3>;
}

export function CardDescription({ children }: CardProps) {
  return <p className="text-sm text-gray-400">{children}</p>;
}

export function CardContent({ children }: CardProps) {
  return <div className="mb-4">{children}</div>;
}

export function CardFooter({ children }: CardProps) {
  return <div className="mt-4">{children}</div>;
}
