'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { NavItem } from './types';

type OrbitalCommandRingProps = {
  navItems: NavItem[];
  activeSection: string;
  onJumpTo: (id: string) => void;
  heroCollapsed: boolean;
};

type MagneticNodeProps = {
  item: NavItem;
  index: number;
  active: boolean;
  expanded: boolean;
  mobile: boolean;
  onJumpTo: (id: string) => void;
};

function MagneticNode({ item, index, active, expanded, mobile, onJumpTo }: MagneticNodeProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const Icon = item.icon;

  const radius = 154;
  const baseAngle = 191;
  const step = 13;
  const angle = (baseAngle + index * step) * (Math.PI / 180);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.button
      type="button"
      aria-label={`Go to ${item.label}`}
      onClick={() => onJumpTo(item.id)}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const dx = (event.clientX - (bounds.left + bounds.width / 2)) * 0.08;
        const dy = (event.clientY - (bounds.top + bounds.height / 2)) * 0.08;
        setOffset({ x: dx, y: dy });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      initial={{ opacity: 0, scale: 0.72, x: 0, y: 0 }}
      animate={{
        opacity: expanded ? 1 : 0,
        scale: expanded ? 1 : 0.72,
        x: mobile ? offset.x : (expanded ? x + offset.x : offset.x),
        y: mobile ? (expanded ? -index * 54 + offset.y : offset.y) : (expanded ? y + offset.y : offset.y),
      }}
      exit={{ opacity: 0, scale: 0.72 }}
      transition={{ type: 'spring', stiffness: 280, damping: 23 }}
      className={[
        'group absolute right-0 bottom-0 flex h-10 items-center gap-2 rounded-full border px-3 text-xs font-medium',
        'backdrop-blur-xl transition-colors',
        active
          ? 'border-cyan-300/90 bg-cyan-300/18 text-cyan-100 shadow-[0_0_20px_rgba(0,245,212,0.35)]'
          : 'border-cyan-200/35 bg-slate-900/65 text-cyan-50 hover:border-cyan-300/75 hover:bg-cyan-300/14',
      ].join(' ')}
      style={{ pointerEvents: expanded ? 'auto' : 'none' }}
      data-cursor="active"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full border border-cyan-300/40 bg-slate-900/80 text-cyan-200">
        <Icon size={13} />
      </span>
      <span className="relative">
        {item.label}
        {active ? <span className="absolute -bottom-1 left-0 h-px w-full bg-cyan-200" /> : null}
      </span>
      <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-cyan-300" />
    </motion.button>
  );
}

export default function OrbitalCommandRing({ navItems, activeSection, onJumpTo, heroCollapsed }: OrbitalCommandRingProps) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();

    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <div
      className="fixed bottom-5 right-5 z-50"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="relative h-12 w-12">
        <AnimatePresence>
          {expanded && !isMobile ? (
            <motion.svg
              key="orbital-arc"
              viewBox="0 0 220 220"
              className="pointer-events-none absolute -right-[168px] -bottom-[168px] h-[220px] w-[220px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <defs>
                <linearGradient id="ring-line" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0,245,212,0.15)" />
                  <stop offset="55%" stopColor="rgba(124,58,237,0.35)" />
                  <stop offset="100%" stopColor="rgba(249,115,22,0.4)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 200 200 A 150 150 0 0 0 20 20"
                fill="none"
                stroke="url(#ring-line)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </motion.svg>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {expanded
            ? navItems.map((item, index) => (
                <MagneticNode
                  key={item.id}
                  item={item}
                  index={index}
                  active={activeSection === item.id}
                  expanded={expanded}
                  mobile={isMobile}
                  onJumpTo={onJumpTo}
                />
              ))
            : null}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          whileTap={{ scale: 0.95 }}
          className="relative z-20 grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-cyan-300/90 bg-cyan-300/10 text-[13px] font-semibold text-cyan-100 backdrop-blur-xl shadow-[0_0_22px_rgba(0,245,212,0.35)]"
          data-cursor="active"
          aria-label="Toggle command ring"
        >
          {heroCollapsed ? (
            <Image src="/iomage/mizan_profile_img.jpg" alt="MR" fill className="object-cover" />
          ) : (
            <span className="font-mono">MR</span>
          )}
          <span className="pointer-events-none absolute inset-0 rounded-full border border-cyan-200/50 animate-pulse" />
        </motion.button>
      </div>
    </div>
  );
}
