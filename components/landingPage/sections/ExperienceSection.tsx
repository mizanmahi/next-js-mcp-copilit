export default function ExperienceSection() {
  return (
    <section id="experience" className="rounded-2xl border border-cyan-300/20 bg-slate-900/70 p-6 backdrop-blur-xl md:p-8">
      <h3 className="text-2xl font-semibold text-cyan-50">Experience</h3>
      <div className="relative mt-5 grid gap-3 pl-6 before:absolute before:left-[9px] before:top-1 before:h-[calc(100%-8px)] before:w-[2px] before:bg-gradient-to-b before:from-cyan-300 before:via-violet-400 before:to-orange-400">
        <article className="relative rounded-xl border border-white/10 bg-slate-950/65 p-4 before:absolute before:-left-[22px] before:top-4 before:h-3 before:w-3 before:rounded-full before:bg-cyan-300 before:shadow-[0_0_16px_rgba(0,245,212,0.6)]">
          <h4 className="font-semibold text-cyan-100">Senior Full-Stack Developer · 2024 - Present</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">Leading architecture and delivery for high-scale SaaS products and AI-integrated workflows.</p>
        </article>
        <article className="relative rounded-xl border border-white/10 bg-slate-950/65 p-4 before:absolute before:-left-[22px] before:top-4 before:h-3 before:w-3 before:rounded-full before:bg-cyan-300 before:shadow-[0_0_16px_rgba(0,245,212,0.6)]">
          <h4 className="font-semibold text-cyan-100">Full-Stack Engineer · 2021 - 2024</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">Shipped customer-facing React and Node.js products, optimized APIs, mentored junior developers.</p>
        </article>
        <article className="relative rounded-xl border border-white/10 bg-slate-950/65 p-4 before:absolute before:-left-[22px] before:top-4 before:h-3 before:w-3 before:rounded-full before:bg-cyan-300 before:shadow-[0_0_16px_rgba(0,245,212,0.6)]">
          <h4 className="font-semibold text-cyan-100">Frontend Developer · 2019 - 2021</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">Built design systems and component architectures for responsive web platforms.</p>
        </article>
      </div>
    </section>
  );
}
