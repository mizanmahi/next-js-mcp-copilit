import {
  Bot,
  Container,
  Database,
  GitBranch,
  Layers,
  Server,
} from 'lucide-react';
import { CSSProperties, MouseEvent, useRef } from 'react';

type SkillTileProps = {
  name: string;
  detail: string;
  accent: string;
  Icon: React.ElementType;
  className?: string;
};

function SkillTile({ name, detail, accent, Icon, className }: SkillTileProps) {
  const tileRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!tileRef.current) {
      return;
    }

    const bounds = tileRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    tileRef.current.style.setProperty('--mx', `${x}%`);
    tileRef.current.style.setProperty('--my', `${y}%`);
  };

  return (
    <div
      ref={tileRef}
      className={[
        'group relative rounded-xl border border-white/15 bg-[linear-gradient(150deg,rgba(14,24,36,0.9),rgba(7,12,18,0.9))] p-4',
        'transition duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,245,212,0.25)]',
        className === 'lg' ? 'md:col-span-2 min-h-[170px]' : '',
        className === 'md' ? 'md:col-span-2' : '',
      ].join(' ')}
      data-cursor="active"
      onMouseMove={handleMove}
      style={{ '--accent': accent, background: `radial-gradient(circle at var(--mx) var(--my), ${accent}55 0%, transparent 58%), linear-gradient(150deg, rgba(14,24,36,0.9), rgba(7,12,18,0.9))` } as CSSProperties}
    >
      <div className="inline-flex items-center gap-2">
        <Icon size={18} className="text-cyan-200" />
        <h3 className="text-lg font-semibold text-cyan-50">{name}</h3>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
      <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-l-xl" style={{ background: accent }} />
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="rounded-2xl border border-cyan-300/20 bg-slate-900/70 p-6 backdrop-blur-xl md:p-8">
      <h3 className="text-2xl font-semibold text-cyan-50">Skills</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <SkillTile
          name="React"
          detail="Server components, streaming UIs, state architecture"
          accent="#00f5d4"
          className="lg"
          Icon={Layers}
        />
        <SkillTile
          name="Node.js"
          detail="Typed APIs, auth, observability, background jobs"
          accent="#7c3aed"
          className="lg"
          Icon={Server}
        />
        <SkillTile
          name="Docker"
          detail="Containerized delivery and parity across environments"
          accent="#22d3ee"
          className="md"
          Icon={Container}
        />
        <SkillTile
          name="Redis"
          detail="Caching, rate-limits, realtime coordination"
          accent="#fb7185"
          Icon={Database}
        />
        <SkillTile
          name="CI/CD"
          detail="GitHub Actions, quality gates, release confidence"
          accent="#f97316"
          Icon={GitBranch}
        />
        <SkillTile
          name="Prisma"
          detail="Schema evolution and data consistency"
          accent="#14b8a6"
          Icon={Database}
        />
        <div
          className="relative overflow-hidden rounded-xl border border-white/15 bg-[linear-gradient(150deg,rgba(14,24,36,0.9),rgba(7,12,18,0.9))] p-4 md:col-span-4"
          data-cursor="active"
        >
          <div className="inline-flex items-center gap-2">
            <Bot size={18} className="text-cyan-200" />
            <h3 className="text-lg font-semibold text-cyan-50">Currently Building</h3>
          </div>
          <p className="mt-2 inline-flex animate-[ticker_9s_linear_infinite] gap-8 whitespace-nowrap text-sm text-slate-200">
            <span>AI Agents</span>
            <span>Multi-step Copilots</span>
            <span>Prompt Ops Tooling</span>
          </p>
          <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-l-xl bg-cyan-300" />
        </div>
      </div>
    </section>
  );
}
