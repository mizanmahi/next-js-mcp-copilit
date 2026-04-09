'use client';

import { useState } from 'react';
import type { NavItem } from './types';

type ProgressArcProps = {
  navItems: NavItem[];
  activeSection: string;
  progress: number;
};

export default function ProgressArc({ navItems, activeSection, progress }: ProgressArcProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed right-2 top-1/2 z-40 hidden h-[62vh] w-10 -translate-y-1/2 md:block">
      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-white/15" />
      <div
        className="absolute bottom-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full"
        style={{
          height: `${Math.max(2, Math.min(100, progress * 100))}%`,
          background: 'linear-gradient(180deg, #00f5d4, #7c3aed 55%, #f97316)',
        }}
      />

      {navItems.map((item, index) => {
        const top = navItems.length > 1 ? (index / (navItems.length - 1)) * 100 : 0;
        const isActive = item.id === activeSection;
        const isHover = hovered === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/60 bg-slate-900/90 transition-transform"
            style={{ top: `${top}%`, transform: `translateX(-50%) translateY(-50%) scale(${isActive ? 1.28 : 1})` }}
            aria-label={item.label}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: isActive ? 'rgba(0,245,212,0.65)' : 'rgba(148,163,184,0.45)',
                boxShadow: isActive ? '0 0 14px rgba(0,245,212,0.55)' : 'none',
              }}
            />
            {isHover ? (
              <span className="absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-cyan-300/40 bg-slate-950/90 px-2 py-1 text-[10px] font-medium text-cyan-100">
                {item.label}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
