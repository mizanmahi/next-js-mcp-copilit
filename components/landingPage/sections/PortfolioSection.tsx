import { motion } from 'framer-motion';

type PortfolioSectionProps = {
  glitchCard: string;
  onCardHover: (cardId: string) => void;
};

export default function PortfolioSection({ glitchCard, onCardHover }: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="rounded-2xl border border-cyan-300/20 bg-slate-900/70 p-6 backdrop-blur-xl md:p-8">
      <h3 className="text-2xl font-semibold text-cyan-50">Portfolio</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <motion.article
          className={[
            'rounded-[2px] border-2 border-[#111] bg-[#d8fff7] p-4 text-[#051014] shadow-[9px_9px_0_0_#f97316] transition-all',
            glitchCard === 'solruf' ? 'animate-[glitch_0.3s_linear]' : '',
          ].join(' ')}
          onMouseEnter={() => onCardHover('solruf')}
          whileHover={{ x: 8, y: 8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          data-cursor="active"
        >
          <h4 className="font-semibold">Solruf</h4>
          <p className="mt-2 text-sm text-[#0f3032]">Energy platform with real-time dashboards, billing intelligence, and robust access controls.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Next.js', 'Node.js', 'PostgreSQL', 'Docker'].map((chip) => (
              <span key={chip} className="rounded-full border-2 border-[#111] bg-[#f7f1ff] px-2 py-1 text-[11px] font-extrabold">{chip}</span>
            ))}
          </div>
        </motion.article>
        <motion.article
          className={[
            'rounded-[2px] border-2 border-[#111] bg-[#d8fff7] p-4 text-[#051014] shadow-[9px_9px_0_0_#00f5d4] transition-all',
            glitchCard === 'lyceum' ? 'animate-[glitch_0.3s_linear]' : '',
          ].join(' ')}
          onMouseEnter={() => onCardHover('lyceum')}
          whileHover={{ x: 8, y: 8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          data-cursor="active"
        >
          <h4 className="font-semibold">Lyceum</h4>
          <p className="mt-2 text-sm text-[#0f3032]">Learning management suite with course analytics, streaming classes, and AI tutor copilots.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['React', 'Prisma', 'Redis', 'CI/CD'].map((chip) => (
              <span key={chip} className="rounded-full border-2 border-[#111] bg-[#f7f1ff] px-2 py-1 text-[11px] font-extrabold">{chip}</span>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
