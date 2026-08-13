import React from 'react';

interface BadgeProps {
  variant?: 'blue' | 'emerald' | 'amber' | 'rose' | 'slate' | 'terracotta' | 'indigo';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'blue',
  children,
  className = ''
}) => {
  const styles = {
    blue: 'bg-indigo-50 text-[#3B4274] border-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    rose: 'bg-rose-50 text-rose-800 border-rose-200',
    slate: 'bg-stone-100 text-stone-700 border-stone-200',
    terracotta: 'bg-[#C85A32]/10 text-[#C85A32] border-[#C85A32]/30',
    indigo: 'bg-[#3B4274]/10 text-[#3B4274] border-[#3B4274]/30'
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>
  );
};
