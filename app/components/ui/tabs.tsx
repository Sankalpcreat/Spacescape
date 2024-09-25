import React, { useState } from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [selectedTab, setSelectedTab] = useState(defaultValue);
  const clonedChildren = React.Children.map(children, (child: any) => {
    if (child.type === TabsContent) {
      return React.cloneElement(child, { isActive: selectedTab === child.props.value });
    } else if (child.type === TabsTrigger) {
      return React.cloneElement(child, { onClick: () => setSelectedTab(child.props.value) });
    }
    return child;
  });

  return <div className={className}>{clonedChildren}</div>;
}

export function TabsTrigger({ children, value, className, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`${className} px-4 py-2 text-sm font-semibold`}
      data-state={value}
    >
      {children}
    </button>
  );
}

export function TabsList({ children, className }: any) {
  return <div className={className}>{children}</div>;
}

export function TabsContent({ children, isActive, className }: any) {
  return isActive ? <div className={className}>{children}</div> : null;
}
