import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Mail } from 'lucide-react';

type HeroSectionProps = {
  word: string;
  onJumpTo: (id: string) => void;
  heroPassed: boolean;
};

const headlineLetters = 'Full-Stack Web Developer'.split('');

export default function HeroSection({ word, onJumpTo, heroPassed }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="grid min-h-[94vh] items-center gap-8 overflow-hidden rounded-2xl border border-cyan-300/20 bg-[linear-gradient(160deg,rgba(14,24,37,0.8),rgba(7,13,20,0.76))] p-6 shadow-[0_16px_38px_rgba(0,0,0,0.35)] md:grid-cols-[1.2fr_0.8fr] md:p-10"
    >
      <div>
        <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-cyan-300">2026 Portfolio // Cyber Grid Edition</p>
        <h2 className="m-0 max-w-[16ch] text-[clamp(2rem,7vw,5.7rem)] font-semibold leading-[0.95]">
          {headlineLetters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.42 }}
              className="inline-block"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h2>

        <div className="mt-4 flex min-h-10 flex-wrap items-baseline gap-2 text-[clamp(1.05rem,3.2vw,1.55rem)] text-cyan-50" aria-live="polite">
          <span>I design systems as a</span>
          <AnimatePresence mode="wait">
            <motion.strong
              key={word}
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
              transition={{ duration: 0.33, ease: 'easeOut' }}
              className="text-cyan-300"
            >
              {word}
            </motion.strong>
          </AnimatePresence>
        </div>

        <p className="mt-4 max-w-[58ch] leading-7 text-slate-300">
          Building resilient products across React, Node.js, cloud infrastructure, and AI-powered user experiences.
          I care about speed, architecture clarity, and deeply usable interfaces.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onJumpTo('portfolio')}
            data-cursor="active"
            className="rounded-full border border-cyan-300/50 bg-cyan-300/15 px-4 py-2 text-sm font-medium text-cyan-50 transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,245,212,0.2)]"
          >
            View Work
          </button>
          <button
            type="button"
            onClick={() => onJumpTo('contact')}
            data-cursor="active"
            className="rounded-full border border-cyan-300/40 bg-transparent px-4 py-2 text-sm font-medium text-cyan-50 transition hover:-translate-y-0.5"
          >
            Hire Me
          </button>
        </div>
      </div>

      <motion.aside
        initial={{ opacity: 0, y: 20, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative ml-auto w-full max-w-[330px] rounded-2xl border border-cyan-300/25 bg-slate-950/75 p-4 shadow-[10px_10px_0_0_#00f5d4] backdrop-blur-xl"
      >
        <div className="mx-auto h-36 w-32 overflow-hidden border border-cyan-300/70 bg-slate-900"
          style={{ clipPath: 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)' }}
          data-cursor="eye"
        >
          <Image src="/iomage/mizan_profile_img.jpg" alt="Mizanur Rahman" width={260} height={320} className="h-full w-full object-cover" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-cyan-50">Mizanur Rahman</h3>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/12 px-3 py-1 text-xs text-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_0_rgba(52,211,153,0.5)] animate-pulse" />
          Available for freelance
        </div>
        <div className="mt-4 flex gap-2">
          {[
            { href: 'https://github.com', label: 'GitHub', Icon: Github },
            { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
            { href: 'mailto:mizan@example.com', label: 'Email', Icon: Mail },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={label}
              data-cursor="active"
              className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/40 bg-slate-900/80 text-cyan-100 transition hover:bg-cyan-300/15"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
        {heroPassed ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-[11px] text-slate-400">
            Profile merged into command orb
          </motion.p>
        ) : null}
      </motion.aside>
    </section>
  );
}
